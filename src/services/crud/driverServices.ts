import {errorService} from "..";
import {Drivers} from "@/models";
import sequelize from "sequelize";
import {RaceDrivers} from "@/models";
import {HttpStatus} from "@/common/enum";
import {CrudService} from "../crudService.pg";
import {AppExceptionType} from "@/common/enum";

export class DriverServices extends CrudService<typeof Drivers>{
    constructor(){super(Drivers)}
    async getAllDriverResultByYear(params: {year: Number}) {
        try{
            const result = await RaceDrivers.findAll({
                where: {"$races.year$": params.year},
                include: [{
                    association: "races",
                    attributes: ["year"]
                },
                {
                    association: "drivers",
                    attributes: ["id", "driver_name", "country"]
                }],
                attributes: [[sequelize.fn("sums", sequelize.col("points")), "pts"], "car"],
                group: ["races.year", "drivers.id", "drivers.name", "drivers.country", "car"],
                order: [["pts", "desc"]],
                raw: true
            })
            if(!result) throw errorService.database.queryFail("found no result");
            return result
        }catch(e){
            console.log(e)
            return ({
                resp: e,
                logs: `driverServices error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
    async getDriverResultByYear(params: {year: Number, driverid: String}){
        try{
            const result = await RaceDrivers.findAll({
                where: {"$races.year$": params.year, "$drivers.id$": params.driverid},
                include: [{
                    association: "races",
                    attributes: ["id", "grand_prix", "date", "year"]
                },
                {
                    association: "drivers",
                    attributes: ["id"]
                }],
                attributes: [[sequelize.fn("sums", sequelize.col("points")), "pts"], "car", "position"],
                group: ["races.year", "drivers.id", "races.grand_prix", "races.date", "car", "position"],
                order: [["date", "asc"]],
                raw: true
            })
            if(!result) throw errorService.database.queryFail("found no result");
            return result
        }catch(e){
            console.log(e)
            return ({
                resp: e,
                logs: `driversServices error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
}
