/* eslint-disable prettier/prettier */
import {sequelize} from '../index';
import {DataTypes} from 'sequelize';

export const Races = sequelize.define('races', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1
  },
  grand_prix: {
    type: DataTypes.STRING,
    //allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    //allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    //allowNull: false
  }
})
