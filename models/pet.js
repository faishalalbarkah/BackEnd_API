"use strict";
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    "pet",
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      aboutpet: DataTypes.STRING,
      photo: DataTypes.STRING,
      user_id: DataTypes.STRING,
      spesies_id: DataTypes.STRING,
      age_id: DataTypes.STRING
    },
    {}
  );
  pet.associate = function(models) {
    // associations can be defined here
    pet.belongsTo(models.user, {
      foreignKey: "user_id"
    });
    pet.belongsTo(models.spesies, {
      foreignKey: "spesies_id"
    });
    pet.belongsTo(models.age, {
      foreignKey: "age_id"
    });
  };
  return pet;
};
