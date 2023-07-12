'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'teams_table',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV1,
            primaryKey: true,
          },
          name: {
            type: Sequelize.DataTypes.STRING,
          },
          base: {
            type: Sequelize.DataTypes.STRING,
          },
          team_chief: {
            type: Sequelize.DataTypes.STRING,
          },
          technical_chief: {
            type: Sequelize.DataTypes.STRING,
          },
          chassis: {
            type: Sequelize.DataTypes.STRING,
          },
          power_unit: {
            type: Sequelize.DataTypes.STRING,
          },
          first_team_entry: {
            type: Sequelize.DataTypes.INTEGER,
          },
          world_championships: {
            type: Sequelize.DataTypes.INTEGER,
          },
          highest_race_finish: {
            type: Sequelize.DataTypes.INTEGER,
          },
          pole_positions: {
            type: Sequelize.DataTypes.INTEGER,
          },
          fastest_laps: {
            type: Sequelize.DataTypes.INTEGER,
          },
        },
        {
          transaction,
        },
      )
    })
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('teams_table', { transaction })
    })
  },
}
