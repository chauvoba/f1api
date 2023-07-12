/* eslint-disable prettier/prettier */
import {sequelize} from '../index';
import {DataTypes} from 'sequelize';

export const RaceDrivers = sequelize.define('race_drivers_table', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1
  },
  driver_id: {
    type: DataTypes.UUID,
    //allowNull: false,
    references: {model: 'drivers_table', key: 'id'}
  },
  race_id: {
    type: DataTypes.UUID,
    //allowNull: false,
    references: {model: 'races_table', key: 'id'}
  },
  car : {
    type: DataTypes.STRING,
    //allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  laps: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    //allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    //allowNull: false
  },
  number_order: {
    type: DataTypes.INTEGER,
    //allowNull: false
  }
},
{
    freezeTableName: true
})
