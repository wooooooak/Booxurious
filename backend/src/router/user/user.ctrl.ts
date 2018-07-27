import User, { UserModel, UserAddModel } from '../../db/model/User';
import { decodeToken } from '../../lib/jwt';
// import { Post, PostModel, PostAddModel } from '../../db/model/post';

export const fetchUserData = async (req, res) => {
  const token = req.headers['auth-header'];
  const decodedToken = await decodeToken(token);
  console.log(decodedToken);
  const { email, username, socialProvider } = decodedToken;
  res.json({ email, username, socialProvider });
};
