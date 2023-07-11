'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'drivers',
        {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV1
              },
              team_id: {
                type: Sequelize.DataTypes.UUID,
                references: {model: `teams`, key: `id`}
              },
              driver_name: {
                type: Sequelize.DataTypes.STRING,
              },
              country: {
                type: Sequelize.DataTypes.STRING,
              },
              podium: {
                type: Sequelize.DataTypes.INTEGER,
              },
              points: {
                type: Sequelize.DataTypes.INTEGER,
              },
              grand_prix_entered: {
                type: Sequelize.DataTypes.INTEGER,
              },
              world_champions: {
                type: Sequelize.DataTypes.INTEGER,
              },
              highest_race_finish: {
                type: Sequelize.DataTypes.INTEGER,
              },
              highest_grid_position: {
                type: Sequelize.DataTypes.INTEGER,
              },
              date_of_birth: {
                type: Sequelize.DataTypes.DATE,
              },
              place_of_birth: {
                type: Sequelize.DataTypes.STRING,
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
      await queryInterface.dropTable('drivers', { transaction })
    })
  },
}
