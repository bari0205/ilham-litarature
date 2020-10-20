"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Library.belongsTo(models.Books, {
        as: "libraryBook",
        foreignKey: {
          name: "bookId",
        },
      });

      Library.belongsTo(models.User, {
        as: "libraryUser",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  Library.init(
    {
      bookId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Library",
    }
  );
  return Library;
};
