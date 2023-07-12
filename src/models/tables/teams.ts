import {sequelize} from '../index';
import {DataTypes} from 'sequelize';

export const Teams = sequelize.define('teams_table', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1
  },
  name: {
    type: DataTypes.STRING,
    //allowNull: false
  },
  base: {
    type:DataTypes.STRING,
    //allowNull: false
  },
  team_chief: {
    type: DataTypes.STRING,
    //allowNull: true
  },
  technical_chief: {
    type: DataTypes.STRING,
    //allowNull: true
  },
  chassis: {
    type: DataTypes.STRING,
    //allowNull: true
  },
  power_unit: {
    type: DataTypes.STRING,
    //allowNull: false
  },
  first_team_entry: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  world_championships: {
    type: DataTypes.INTEGER,
    //allowNull: true
  },
  highest_race_finish: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  pole_positions: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  fastest_laps: {
    type: DataTypes.INTEGER
  }
},
{
    freezeTableName: true
})
