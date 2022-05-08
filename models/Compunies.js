'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compunies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment, {
        foreignKey: 'CompunyId',
        as: 'comments',
      });
    }
  }
  Compunies.init(
    {
      Address: DataTypes.STRING,
      Name: DataTypes.STRING,
      email: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Compunies',
    },
  );
  return Compunies;
};
