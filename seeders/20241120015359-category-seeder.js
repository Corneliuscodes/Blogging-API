'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(`categories`, [
      {
        name: `Nodejs`
      },
      {
        name: `React`
      },
      {
        name: `Flutter`
      },
      {
        name: `Laravel`
      },
      {
        name: `PHP`
      }
    ])
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete(`categories`, null, {})
  }
};
