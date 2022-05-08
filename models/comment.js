'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.Customers, {
        foreignKey: 'id',
        as: 'Customers',
      });
      this.belongsTo(models.Compunies, {
        foreignKey: 'id',
        as: 'Compunies',
      });
    }
  }
  Comment.init(
    {
      text: DataTypes.TEXT,
      CompunyId: DataTypes.INTEGER,
      CustomerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  );
  return Comment;
};
