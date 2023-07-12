import {Request} from "../base";
import {Response} from "../base";
import {CrudRouter} from "../crud.pg";
import {teamControllers} from "@/controllers";

export default class TeamRouter extends CrudRouter<typeof teamControllers> {
	constructor() {
		super(teamControllers)
	}
	customRouting() {
		this.router.get("/get-all-team-result/:year", this.route(this.getAllTeamResultByYear))
        this.router.get(":teamid/get-team-result/:year", this.route(this.getTeamResultByYear))
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
}