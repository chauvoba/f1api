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
            return result
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
            return result
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
    async getAllTeamResultByYear(params: {year: Number}) {
        try{
            const result = await RaceDrivers.findAll({
                where: {"$races.year$": params.year},
                include: [{
                        association: "races",
                        attributes: ["year"]
                    },
                    {
                        association: "drivers",
                        attributes: [],
                        include: [{
                                association: "teams",
                                attributes: ["team_name"]
                            }]
                    }],
                attributes: [[sequelize.fn("sums", sequelize.col("points")), "pts"]],
                group: ["races.year", "drivers.team_id"],
                order: [["pts", "desc"]],
                raw: true
            });
            if(!result) throw errorService.database.queryFail("found no result");
            return result
        }catch(e){
            console.log(e)
            return ({
                resp: e,
                logs: `teamServices error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR,
            });
        }
    }
    async getTeamResultByYear(params: {year: Number, teamid: String}) {
        try{
            const result = await RaceDrivers.findAll({
                where: {"$races.year$": params.year, "$drivers.team_id$": params.teamid},
                include: [{
                    association: "races",
                    attributes: ["grand_prix", "date", "year"]
                },
                {
                    association: "drivers",
                    attributes: ["team_id"]
                }],
                attributes: [[sequelize.fn("sums", sequelize.col("points")), "pts"]],
                group: ["races.year", "drivers.team_id", "races.id", "races.grand_prix", "races.date"],
                raw: true
            });
            if(!result) throw errorService.database.queryFail("found no result");
            return result
        }catch(e){
            console.log(e)
            return ({
                resp: e,
                logs: `teamServices error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
}
