'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'races',
        {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV1
            },
            grand_prix: {
                type: Sequelize.DataTypes.STRING
            },
            date: {
                type: Sequelize.DataTypes.DATE
            },
            year: {
                type: Sequelize.DataTypes.INTEGER
            }
        },
        {
          transaction,
        },
      )
    })
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('races', { transaction })
    })
  },
}
