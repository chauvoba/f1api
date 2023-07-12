'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'race_drivers_table',
        {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV1
              },
              driver_id: {
                type: Sequelize.DataTypes.UUID,
                references: {model: 'drivers_table', key: 'id'}
              },
              race_id: {
                type: Sequelize.DataTypes.UUID,
                references: {model: 'races_table', key: 'id'}
              },
              car : {
                type: Sequelize.DataTypes.STRING
              },
              position: {
                type: Sequelize.DataTypes.INTEGER
              },
              laps: {
                type: Sequelize.DataTypes.INTEGER
              },
              time: {
                type: Sequelize.DataTypes.STRING
              },
              points: {
                type: Sequelize.DataTypes.INTEGER
              },
              number_order: {
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
      await queryInterface.dropTable('race_drivers_table', { transaction })
    })
  },
}
