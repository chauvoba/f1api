import {Races} from "@/models";
import {errorService} from "..";
import sequelize from "sequelize";
import {RaceDrivers} from "@/models";
import {HttpStatus} from "@/common/enum";
import {CrudService} from "../crudService.pg";
import {AppExceptionType} from "@/common/enum";

export class RaceServices extends CrudService<typeof Races>{
    constructor(){super(Races)};
    async getRaceInfo(params: {raceid: String}){
        try{
            const result = await this.model.findAll({
                where: {id: params.raceid},
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
                },
                raw: false
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return result;
        }catch(e){
            console.log(e);
            return ({
                resp: e,
                logs: `raceServices-get-race-info error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
    async getRaceResult(params: {year: Number, raceid: String}){
        try{
            const result = await RaceDrivers.findAll({
                where: {
                    "$races.year$": params.year,
                    "$races.id$": params.raceid
                },
                include: [
                    {
                        association: "races",
                        attributes: ["grand_prix"]
                    },
                    {
                        association: "drivers",
                        attributes: ["driver_name"]
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt", "id", "driver_id", "race_id"]
                },
                order: [
                    ["position", "asc"]
                ],
                raw: true
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return ({
                resp: `Showing result of race ${params.raceid} in ${params.year}`,
                result
            })
        }catch(e){
            console.log(e);
            return ({
                resp: e,
                logs: `raceServices-get-race-result error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
}
