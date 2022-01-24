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
        let newestData = await seq.models.ScrapedData.findAll({
            attributes: [
                'CompanyId',
                'Id',
                "Price",
                "EPS",
                "BVPS",
                [seq.fn('max', seq.col('Timestamp')), 'Timestamp'],
            ],
            group: 'CompanyId'
        });

        newestData.forEach((item) => {
            mailData.push({
                CompanyName: companies.find((company) => company.Id === item.CompanyId).Name,
                Price: item.dataValues.Price,
                GrahamNumber: methods.grahamNumber(item.dataValues)
            });
        })
        
        mailer.sendEmail(mailData);
    }
    catch (err) {
        console.log("error: ", err);
    }
};

main();