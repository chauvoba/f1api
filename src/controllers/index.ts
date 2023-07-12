import {CrudController} from './crudController';
import {TeamControllers} from './crud/teamControllers';
import {DriverControllers} from './crud/driverControllers';
// SECTION

// Crud
const teamControllers = new TeamControllers();
const driverControllers = new DriverControllers();
// SECTION

export {
  CrudController,
  teamControllers,
  driverControllers
};
