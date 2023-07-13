import {Teams} from "@/models";
import {errorService} from "..";
import sequelize from "sequelize";
import {HttpStatus} from "@/common/enum";
import {RaceDrivers} from "@/models/tables";
import {CrudService} from "../crudService.pg";
import {AppExceptionType} from "@/common/enum";

export class TeamServices extends CrudService<typeof Teams>{
    constructor(){super(Teams)}
    async getAllTeamInfo(){
        try{
            const result = await this.model.findAll({
                include: [
                    {
                        association: "drivers",
                        attributes: ["driver_name", "id"]
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
                },
                raw: false
            })
            if(result.length === 0) return errorService.database.queryFail("found no result")
            return ({
                resp: `Showing all F1 team info`,
                result
            })
        }catch(e){
            console.log(e);
            return({
                resp: e,
                logs: `teamServices-get-all-team-info error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
    async getTeamInfo(params: {teamid: String}){
        try{
            const result = await this.model.findAll({
                where: {id: params.teamid},
                include: [
                    {
                        association: "drivers",
                        attributes: ["driver_name"]
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
                },
                raw: false,
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return ({
                resp: `Showing F1 team ${params.teamid} info`,
                result
            })
        }catch(e){
            console.log(e)
            return ({
                resp: e,
                logs: `teamServices-get-team-info error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
}
