"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

const { SALT_ROUNDS } = require("../config/serverConfig");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: "User_Roles",
      });
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        set(password) {
          const passowrdHash = bcrypt.hashSync(
            password,
            parseInt(SALT_ROUNDS, 10)
          );
          this.setDataValue("password", passowrdHash);
        },
        // validate: {
        //   len: [3, 100],
        // },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
