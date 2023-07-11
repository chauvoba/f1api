import {teamServices} from "@/services";
import {CrudController} from "../crudController";

export class TeamControllers extends CrudController<typeof teamServices>{
    constructor(){
        super(teamServices)
    }
    async getAllTeamResultByYear(params: {year: Number}){
        const result = await this.service.getAllTeamResultByYear(params);
        return result;
    }
    async getTeamResultByYear(params: {year: Number, teamid: String}){
        const result = await this.service.getTeamResultByYear(params);
        return result;
    }
}
