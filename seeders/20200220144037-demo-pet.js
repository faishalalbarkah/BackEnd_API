"use strict";
const date = new Date();
const dateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "pets",
      [
        {
          name: "jarwo",
          gender: "ganda",
          aboutpet: "pet jancok",
          photo: "http://localhost:3000/bawaan2.jpg",
          user_id: "1",
          spesies_id: "1",
          age_id: "1",
          createdAt: dateTime,
          updatedAt: dateTime
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("pets", null, {});
  }
};
