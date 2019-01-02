import { decodeToken } from '../lib/jwt';

export const authMiddleware = async (req, res, next) => {
	const token = req.headers['auth-header'] || req.query.token;
	if (!token) {
		console.log('헤더에 토큰이 없습니다.');
		return res.status(403).json({
			success: false,
			message: 'not logged in'
		});
	}
	try {
		const decodedUser = await decodeToken(token);
		req.decodedUser = decodedUser;
		next();
	} catch (error) {
		res.status(403).json({
			message: '토큰이 유효하지 않습니다.'
		});
	}
};
