import {sequelize} from '../index';
import {DataTypes} from 'sequelize';

export const Teams = sequelize.define('teams', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1
  },
  team_name: {
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
  team_technical_chief: {
    type: DataTypes.STRING,
    //allowNull: true
  },
  chasis: {
    type: DataTypes.STRING,
    //allowNull: true
  },
  power_unit: {
    type: DataTypes.STRING,
    //allowNull: false
  },
  first_entry: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  world_championship: {
    type: DataTypes.INTEGER,
    //allowNull: true
  },
  highest_race_finish: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  pole_position: {
    type: DataTypes.INTEGER,
    //allowNull: false
  }
})
