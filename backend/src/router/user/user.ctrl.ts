import User, { UserModel, UserAddModel } from '../../db/model/User';
import { decodeToken } from '../../lib/jwt';
// import { Post, PostModel, PostAddModel } from '../../db/model/post';

export const fetchUserData = async (req, res) => {
  const token = req.headers['auth-header'];
  const decodedToken = decodeToken(token);
  console.log(decodedToken);
};
