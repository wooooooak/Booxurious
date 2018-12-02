import User from '../../db/model/User';
import Planer from '../../db/model/Planer';
import Plan from '../../db/model/Plan';

export const getPlans = async (req, res) => {
	const { userId } = req.decodedUser;
	const resData = {
		isWriter: false,
		Plans: []
	};
	try {
		const planner = await Planer.findOne({ where: { fk_user_id: userId } });
		if (planner) {
			const Plans = await Plan.find({ where: { fk_user_id: userId } });
			resData.isWriter = true;
			resData.Plans = Plans;
			res.json(resData);
		} else {
			res.json(resData);
		}
	} catch (error) {
		console.log(error);
		res.json(error);
	}
};

/**
 * req.body :  { term:number, starDate:string }
 * is it end?
 * 
 * response: { isWriter: true, Plans : []}
 */
export const initializePlan = async (req, res) => {
	const { userId } = req.decodedUser;
	const { term, startDate } = req.body;
	console.log(startDate);
	try {
		const user = await User.findOne({
			where: { id: userId }
		});
		const planner = await Planer.create({
			term,
			startDate
		});
		console.log(planner);
		planner.setUser(user, { save: true });
		res.status(200).json({ isWriter: true, Plans: [] });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
