'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          text: 'lalala 1 2',
          CompunyId: 1,
          CustomerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'test 2 2',
          CompunyId: 2,
          CustomerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'test 3 4',
          CompunyId: 3,
          CustomerId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
