import {CrudController} from './crudController';
import {TeamControllers} from './crud/teamControllers';
import {RaceControllers} from './crud/raceControllers';
import {DriverControllers} from './crud/driverControllers';
// SECTION

// Crud
const teamControllers = new TeamControllers();
const raceControllers = new RaceControllers();
const driverControllers = new DriverControllers();
// SECTION

export {
  CrudController,
  raceControllers,
  teamControllers,
  driverControllers
};
