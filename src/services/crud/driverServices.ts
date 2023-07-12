import {errorService} from "..";
import {Drivers} from "@/models";
import sequelize from "sequelize";
import {RaceDrivers} from "@/models";
import {HttpStatus} from "@/common/enum";
import {CrudService} from "../crudService.pg";
import {AppExceptionType} from "@/common/enum";

export class DriverServices extends CrudService<typeof Drivers>{
    constructor(){super(Drivers)}
    async getAllDriverInfo() {
        try{
            const result = await this.model.findAll({
                include: [
                    {
                        association: "teams",
                        attributes: ["name"]
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt", "id", "team_id"]
                },
                raw: false
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return result;
        }catch(e){
            console.log(e);
            return ({
                resp: e,
                logs: `driverServices-get-all-driver error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
    async getDriverInfo(params: {driverid: String}) {
        try{
            const result = await this.model.findAll({
                where: {id: params.driverid},
                include: [
                    {
                        association: "teams",
                        attributes: ["name"]
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt", "id", "team_id"]
                },
                raw: false
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return result;
        }catch(e){
            console.log(e);
            return ({
                resp: e,
                logs: `driverServices-get-driver-info error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
    async getDriverResultByYear(params: {year: Number, driverid: String}){
        try{
            const result = await RaceDrivers.findAll({
                where: {
                    "$races.year$": params.year,
                    "$drivers.id$": params.driverid
                },
                include: [
                    {
                        association: "drivers",
                        attributes: ["driver_name"]
                    },
                    {
                        association: "races",
                        attributes: ["grand_prix", "date"]
                    }
                ],
                attributes: [
                    "car", "position", "points"
                ],
                raw: true
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return ({
                resp: `result for driver ${params.driverid} in ${params.year}`,
                result
            });
        }catch(e){
            console.log(e);
            return ({
                resp: e,
                logs: `driverServices-get-driver-result error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
    // async getDriverResultByYear2(params: {year: Number, drivername: String}){
    //     try{
    //         function capitalizeFirstLetter(string: String) {
    //             return string.charAt(0).toUpperCase() + string.slice(1);
    //         }
    //         console.log(capitalizeFirstLetter(params.drivername.split('_').join(" ")));
    //         const result = await RaceDrivers.findAll({
    //             where: {
    //                 "$races.year$": params.year,
    //                 "$drivers.driver_name$": params.drivername
    //             },
    //             include: [
    //                 {
    //                     association: "drivers",
    //                     attributes: ["driver_name"]
    //                 },
    //                 {
    //                     association: "races",
    //                     attributes: ["grand_prix", "date"]
    //                 }
    //             ],
    //             attributes: [
    //                 "car", "position", "points"
    //             ],
    //             raw: true
    //         })
    //         if(result.length === 0) return errorService.database.queryFail("found no result");
    //         return ({
    //             resp: `result for driver ${params.drivername} in ${params.year}`,
    //             result
    //         });
    //     }catch(e){
    //         console.log(e);
    //         return ({
    //             resp: e,
    //             logs: `driverServices-get-driver-result error`,
    //             erid: HttpStatus.INTERNAL_SERVER_ERROR,
    //             type: AppExceptionType.INTERNAL_SERVER_ERROR
    //         })
    //     }
    // }
}
