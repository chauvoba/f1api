import {driverServices} from "@/services";
import {CrudController} from "../crudController";

export class DriverControllers extends CrudController<typeof driverServices>{
    constructor(){
        super(driverServices)
    }
    async getAllDriverInfo(){
        const result = await this.service.getAllDriverInfo();
        return result;
    }
    async getDriverInfo(params: {driverid: String}){
        const result = await this.service.getDriverInfo(params);
        return result;
    }
    // async getAllDriverResultByYear(params: {year: Number}){
    //     const result = await this.service.getAllDriverResultByYear(params);
    //     return result;
    // }
    async getDriverResultByYear(params: {year: Number, driverid: String}){
        const result = await this.service.getDriverResultByYear(params);
        return result;
    }
    // async getDriverResultByYear2(params: {year: Number, drivername: String}){
    //     const result = await this.service.getDriverResultByYear2(params);
    //     return result;
    // }
}
