/* eslint-disable prettier/prettier */
import {sequelize} from '../index';
import {DataTypes} from "sequelize";

export const Drivers = sequelize.define('drivers_table', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1
  },
  team_id: {
    type: DataTypes.UUID,
    //allowNull: true,
    references: {model: `teams_table`, key: `id`}
  },
  driver_name: {
    type: DataTypes.STRING,
    //allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    //allowNull: false
  },
  podium: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  grand_prix_entered: {
    type: DataTypes.INTEGER,
    //allowNull: true
  },
  world_champions: {
    type: DataTypes.INTEGER,
    //allowNull: true
  },
  highest_race_finish: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  highest_grid_position: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATE,
    //allowNull: false
  },
  place_of_birth: {
    type: DataTypes.STRING,
    //allowNull: false
  }
},
{
    freezeTableName: true
})
