import {driverServices} from "@/services";
import {CrudController} from "../crudController";

export class DriverControllers extends CrudController<typeof driverServices>{
    constructor(){
        super(driverServices)
    }
    async getAllDriverResultByYear(params: {year: Number}){
        const result = await this.service.getAllDriverResultByYear(params);
        return result;
    }
    async getDriverResultByYear(params: {year: Number, driverid: String}){
        const result = await this.service.getDriverResultByYear(params);
        return result;
    }
}
