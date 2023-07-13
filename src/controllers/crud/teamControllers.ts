import {teamServices} from "@/services";
import {CrudController} from "../crudController";

export class TeamControllers extends CrudController<typeof teamServices>{
    constructor(){
        super(teamServices)
    }
    async getAllTeamInfo(){
        const result = await this.service.getAllTeamInfo();
        return result;
    }
    async getTeamInfo(params: {teamid: String}){
        const result = await this.service.getTeamInfo(params);
        return result;
    }
    async getAllTeamResultByYear(params: {year: Number}){
        const result = await this.service.getAllTeamResultByYear(params);
        return result;
    }
    async getTeamResultByYear(params: {year: Number, teamid: String}){
        const result = await this.service.getTeamResultByYear(params);
        return result;
    }
    async getTeamTotalPointByYear(params: {year: Number, teamid: String}){
        const result = await this.service.getTeamTotalPointByYear(params);
        return result;
    }
}
