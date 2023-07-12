import {Request} from "../base";
import {Response} from "../base";
import {CrudRouter} from "../crud.pg";
import {raceControllers} from "@/controllers";

export default class RaceRouter extends CrudRouter<typeof raceControllers>{
    constructor(){
        super(raceControllers)
    };

    customRouting(){
        this.router.get("/get-race-info/:raceid", this.route(this.getRaceInfo));
    }
    async getRaceInfo(req: Request, res: Response){
        const raceid: String = req.params.raceid;
        const result = await this.controller.getRaceInfo({raceid});
        this.onSuccess(res, result);
    }
}
