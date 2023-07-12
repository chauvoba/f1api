import { ErrorService } from './errorService';
import { UtilService } from "@/services/utilService";
// Crud
import { RaceServices } from './crud/raceServices';
import { TeamServices } from './crud/teamServices';
import { ScheduleService } from './scheduleService';
import { DriverServices } from './crud/driverServices';
import { ICrudExecOption, CrudService } from './crudService';

// SERVICE SECTION
const utilService = new UtilService();
const errorService = new ErrorService();
const scheduleService = new ScheduleService();
// CRUD SECTION
const raceSerivces = new RaceServices();
const teamServices = new TeamServices();
const driverServices = new DriverServices();

export {
  CrudService,
  ICrudExecOption,
  utilService,
  raceSerivces,
  errorService,
  teamServices,
  driverServices,
  scheduleService,
};
