"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Books.belongsTo(models.User, {
        as: "bookUser",
        foreignKey: {
          name: "userId",
        },
      });

      Books.hasMany(models.Library);
    }
  }
  Books.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      publication: DataTypes.DATE,
      page: DataTypes.INTEGER,
      ISBN: DataTypes.STRING,
      aboutBook: DataTypes.STRING,
      file: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Books",
    }
  );
  return Books;
};
