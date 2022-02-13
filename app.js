const { Sequelize } = require("sequelize");
const initModel = require("./model");
const config =  require("./config");
const mailer = require("./mailer");
const methods = require("./methods");

console.log("starting...");

const seq = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect
  });

initModel(seq);

let mailData = [];
async function main() {
    try {
        seq.authenticate();
        console.log('Connected to invest Db');

        let companies = await seq.models.WatchedCompany.findAll();

        for (let i = 0; i < companies.length; i++) {
            let company = companies[i];
            let item = await seq.models.ScrapedData.findOne({
                attributes: [
                    'CompanyId',
                    'Id',
                    "Price",
                    'Timestamp'
                ],
                where: {
                    CompanyId: company.Id
                },
                order: [
                    ['Timestamp', 'DESC']
                ] 
            });

            let dataValues = {
                Price: item.dataValues.Price,
                EPS: company.EPS,
                BVPS: company.BVPS,
                PE: company.PE,
                PBV: company.PBV,
                CurrentRatio: company.CurrentRatio,
                DividendJson: company.DividendJson,
                EarningsJson: company.EarningsJson,
            }

            let companyData = {
                CompanyName: company.Name,
                Price: item.dataValues.Price,
                MethodValues: methods.map((method) => {
                    let value = method.calc(dataValues);
                    return {
                        value: value,
                        percentage: method.calcDifference ? ((value / item.dataValues.Price) - 1) : undefined,
                        calcDifference: method.calcDifference,
                        useNumberFormatter: method.useNumberFormatter
                    };
                })
            }
            mailData.push(companyData);
        };
        
        mailer.sendEmail(mailData);
    }
    catch (err) {
        console.log("error: ", err);
    }
};

main();