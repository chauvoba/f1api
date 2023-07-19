import {Request} from "../base";
import {Response} from "../base";
import {CrudRouter} from "../crud.pg";
import {driverControllers} from "@/controllers";

export default class DriverRouter extends CrudRouter<typeof driverControllers>{
    constructor(){
        super(driverControllers)
    }
    customRouting(){
        this.router.get("/get-all-driver-info", this.route(this.getAllDriverInfo))
        this.router.get("/get-driver-info/:driverid", this.route(this.getDriverInfo));
        this.router.get("/get-all-driver-result/:year", this.route(this.getAllDriverResultByYear));
        this.router.get("/:driverid/get-driver-result/:year", this.route(this.getDriverResultByYear));
        this.router.get("/:driverid/get-driver-total-point/:year", this.route(this.getDriverTotalPointByYear));
    }
    async getAllDriverInfo(req: Request, res: Response){
        const result = await this.controller.getAllDriverInfo();
        this.onSuccess(res, result);
    }
    async getDriverInfo(req: Request, res: Response){
        const driverid: String = req.params.driverid;
        const result = await this.controller.getDriverInfo({driverid});
        this.onSuccess(res, result);
    }
    async getAllDriverResultByYear(req: Request, res: Response){
        const year: Number = parseInt(req.params.year);
        const result = await this.controller.getAllDriverResultByYear({year});
        this.onSuccess(res, result);
    }
    async getDriverResultByYear(req: Request, res: Response){
        const year: Number = parseInt(req.params.year);
        const driverid: String = req.params.driverid;
        const result = await this.controller.getDriverResultByYear({year, driverid});
        this.onSuccess(res, result);
    }
    async getDriverTotalPointByYear(req: Request, res: Response){
        const year: Number = parseInt(req.params.year);
        const driverid: String = req.params.driverid;
        const result = await this.controller.getDriverTotalPointByYear({year, driverid});
        this.onSuccess(res, result);
    }
}
