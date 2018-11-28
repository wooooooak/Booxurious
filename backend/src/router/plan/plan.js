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
