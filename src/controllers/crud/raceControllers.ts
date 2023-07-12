import {raceSerivces} from "@/services";
import {CrudController} from "../crudController";

export class RaceControllers extends CrudController<typeof raceSerivces>{
    constructor(){super(raceSerivces)};
    async getRaceInfo(params: {raceid: String}){
        const result = await this.service.getRaceInfo(params);
        return result;
    }
}
