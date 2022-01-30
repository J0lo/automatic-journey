const { Sequelize, DataTypes, Model } = require('sequelize');

class WatchedCompany extends Model {};
class ScrapedData extends Model {};

var initModel = (sequelize) => {
    WatchedCompany.init({
        Id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        Name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Symbol: {
          type: DataTypes.STRING,
          allowNull: false
        },
        YahooFinance: {
          type: DataTypes.STRING,
          allowNull: false
        },
        InvestingCom: {
          type: DataTypes.STRING,
          allowNull: false
        },
        BiznesRadar: {
          type: DataTypes.STRING,
          allowNull: false
        },
      }, {
        sequelize,
        modelName: 'WatchedCompany',
        tableName: "WatchedCompanies",
        createdAt: false,
        updatedAt: false
      });
      
      ScrapedData.init({
        Id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        CompanyId: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Price: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        EPS: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        BVPS: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        PE: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        PBV: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        CurrentRatio: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        DividendJson: {
          type: DataTypes.STRING,
          allowNull: false
        },
        EarningsJson: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
        sequelize,
        modelName: 'ScrapedData',
        tableName: "ScrapedData",
        createdAt: "Timestamp",
        updatedAt: false
      });
}

module.exports = initModel;