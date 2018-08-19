import User, { UserModel, UserAddModel } from '../../db/model/User';
import { decodeToken } from '../../lib/jwt';

export const fetchUserData = async (req, res) => {
  const token = req.headers['auth-header'];
  const decodedToken = await decodeToken(token);
  console.log(decodedToken);
  const { email, username, socialProvider, profileImg } = decodedToken;
  res.json({ email, username, socialProvider, profileImg });
};
