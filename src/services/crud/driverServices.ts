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
                    exclude: ["createdAt", "updatedAt", "deletedAt", "team_id"]
                },
                raw: false
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return ({
                resp: `Showing all F1 racers info`,
                result
            })
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
            return ({
                resp: `Showing F1 racers ${params.driverid} info`,
                result
            })
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
                    "car", "position", "race_points"
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
    async getAllDriverResultByYear(params: {year: Number}){
        try{
            const result = await RaceDrivers.findAll({
                where: {
                    "$races.year$": params.year
                },
                include: [
                    {
                        association: "drivers",
                        attributes: ["id", "driver_name", [sequelize.literal("country"), "nationality"]]
                    },
                    {
                        association: "races",
                        attributes: ["year"]
                    }
                ],
                attributes: [
                    [sequelize.fn("sum", sequelize.col("race_points")), "total points"]
                ],
                group: [
                    "drivers.id", "races.year"
                ],
                order: [
                    ["total points", "desc"]
                ],
                raw: true
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return ({
                resp: `Showing ${params.year} results of all drivers participated`,
                result
            })
        }catch(e){
            console.log(e);
            return ({
                resp: e,
                logs: `driverServices-get-all-driver-result error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
}
