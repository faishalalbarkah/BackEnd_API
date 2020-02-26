"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      breeder: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      admin: DataTypes.INTEGER
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    // login.belongsTo(models.user, {
    //   as: "createdBy",
    //   foreignKey: "created_by"
    // });
  };
  return user;
};
