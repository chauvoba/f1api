import {Request} from "../base";
import {Response} from "../base";
import {CrudRouter} from "../crud.pg";
import {teamControllers} from "@/controllers";

export default class TeamRouter extends CrudRouter<typeof teamControllers> {
	constructor() {
		super(teamControllers)
	}
	customRouting() {
        this.router.get("/get-all-team-info", this.route(this.getAllTeamInfo))
        this.router.get("/get-team-info/:teamid", this.route(this.getTeamInfo))
		this.router.get("/get-all-team-result/:year", this.route(this.getAllTeamResultByYear))
        this.router.get("/:teamid/get-team-result/:year", this.route(this.getTeamResultByYear))
        this.router.get("/:teamid/get-team-total-point/:year", this.route(this.getTeamTotalPointByYear))
	}
    async getAllTeamInfo(req: Request, res: Response) {
        const result = await this.controller.getAllTeamInfo();
        this.onSuccess(res, result);
    }
    async getTeamInfo(req: Request, res: Response) {
        const teamid: String = req.params.teamid;
        const result = await this.controller.getTeamInfo({teamid});
        this.onSuccess(res, result);
    }
	async getTeamResultByYear(req: Request, res: Response) {
		const year: Number = parseInt(req.params.year)
		const teamid: String = req.params.teamid
		const result = await this.controller.getTeamResultByYear({ year, teamid})
		this.onSuccess(res, result)
	}
	async getAllTeamResultByYear(req: Request, res: Response) {
		const year: Number = parseInt(req.params.year)
		const result = await this.controller.getAllTeamResultByYear({ year })
		this.onSuccess(res, result)
	}
    async getTeamTotalPointByYear(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year);
        const teamid: String = req.params.teamid;
        const result = await this.controller.getTeamTotalPointByYear({year, teamid})
        this.onSuccess(res, result);
    }
}
