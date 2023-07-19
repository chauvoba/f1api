import {Teams} from "@/models";
import {errorService} from "..";
import sequelize from "sequelize";
import {Drivers} from "@/models/tables";
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
    async getAllTeamResultByYear(params: {year: Number}){
        try{
            const result = await RaceDrivers.findAll({
                where: {
                    "$races.year$": params.year
                },
                include: [
                    {
                        association: "races",
                        attributes: []
                    },
                    {
                        association: "drivers",
                        attributes: [],
                        include: [
                            {
                                association: "teams",
                                attributes: ["name"]
                            }
                        ]
                    }
                ],
                attributes: [
                    [sequelize.fn("sum", sequelize.col("race_points")), "Team total points"]
                ],
                group: [
                    "drivers->teams.id"
                ],
                order: [
                    ["Team total points", "desc"]
                ],
                raw: true
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return ({
                resp: `Showing all F1 teams result in ${params.year}`,
                result
            })
        }catch(e){
            console.log(e);
            return ({
                resp: e,
                logs: `teamServices-get-all-team-result error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
    async getTeamResultByYear(params: {year: Number, teamid: String}){
        try{
            const result = await RaceDrivers.findAll({
                where: {
                    "$races.year$": params.year,
                    "$drivers.team_id$": params.teamid
                },
                include: [
                    {
                        association: "races",
                        attributes: ["grand_prix", "date"]
                    },
                    {
                        association: "drivers",
                        attributes: [],
                        include: [
                            {
                                association: "teams",
                                attributes: ["name"]
                            }
                        ]
                    }
                ],
                attributes: [
                    [sequelize.fn("sum", sequelize.col("race_points")), "Total team points in grand prix"]
                ],
                group: [
                    "drivers->teams.id", "races.grand_prix", "races.date", "drivers.team_id"
                ],
                raw: true
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return ({
                resp: `Showing result in ${params.year} for team ${params.teamid}`,
                result
            })
        }catch(e){
            console.log(e);
            return ({
                resp: e,
                logs: `teamServices-get-team-result error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
    async getTeamTotalPointByYear(params: {year: Number, teamid: String}){
        try{
            const result = await RaceDrivers.findAll({
                where: {
                    "$races.year$": params.year,
                    "$drivers.team_id$": params.teamid
                },
                include: [
                    {
                        association: "races",
                        attributes: []
                    },
                    {
                        association: "drivers",
                        attributes: [],
                        include: [
                            {
                                association: "teams",
                                attributes: ["name"]
                            }
                        ]
                    }
                ],
                attributes: [
                    [sequelize.fn("sum", sequelize.col("race_points")), `Total points in ${params.year}`]
                ],
                group: [
                    "drivers->teams.id"
                ],
                raw: true
            })
            if(result.length === 0) return errorService.database.queryFail("found no result");
            return ({
                resp: `Showing team ${params.teamid} total point in ${params.year}`,
                result
            })
        }catch(e){
            console.log(e);
            return ({
                resp: e,
                logs: `teamServices-get-total-points error`,
                erid: HttpStatus.INTERNAL_SERVER_ERROR,
                type: AppExceptionType.INTERNAL_SERVER_ERROR
            })
        }
    }
}
