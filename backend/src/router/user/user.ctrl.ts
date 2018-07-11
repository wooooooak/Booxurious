import { User, UserModel, UserAddModel } from '../../model/user';

export const test = async (req, res) => {
  const user: UserModel = await User.create({ email: 'eae', password: 'Asdf' });
  const users = User.findAll({ where: { email: 'eae' } });
  return res.json(user);
};
