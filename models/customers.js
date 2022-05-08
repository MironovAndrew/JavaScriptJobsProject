'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment, {
        foreignKey: 'CustomerId',
        as: 'comments',
      });
    }
  }
  Customers.init(
    {
      Address: DataTypes.STRING,
      FirstName: DataTypes.STRING,
      SecondName: DataTypes.STRING,
      email: DataTypes.STRING,
      Age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Customers',
    },
  );
  return Customers;
};
