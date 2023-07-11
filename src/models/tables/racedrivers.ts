/* eslint-disable prettier/prettier */
import {sequelize} from '../index';
import {DataTypes} from 'sequelize';

export const RaceDrivers = sequelize.define('race_drivers', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1
  },
  driver_id: {
    type: DataTypes.UUID,
    //allowNull: false,
    references: {model: 'drivers', key: 'id'}
  },
  race_id: {
    type: DataTypes.UUID,
    //allowNull: false,
    references: {model: 'races', key: 'id'}
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
})
