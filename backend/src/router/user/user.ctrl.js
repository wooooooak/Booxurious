import User from "../../db/model/User";
import { decodeToken } from "../../lib/jwt";
import { dumper } from "dumper";

export const fetchUserData = async (req, res) => {
  const token = req.headers["auth-header"];
  try {
    const decodedToken = await decodeToken(token);
    const user = await User.findOne({ where: { id: decodedToken.userId } });
    const { id, email, username, socialProvider, profileImg } = user;
    res.status(200).json({ id, email, username, socialProvider, profileImg });
  } catch (error) {
    dumper(error);
    res.status(403).json(error);
  }
};

export const updateUser = async (req, res) => {
  const { userId: id } = req.decodedUser;
  const { username, profileImg } = req.body;
  try {
    const user = await User.update({ username, profileImg }, { where: { id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const destroyUser = async (req, res) => {
  const { userId: id } = req.decodedUser;
  try {
    // result receive 1 when destroy successfully
    // or 0 when fail destroy
    const result = await User.destroy({ where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allAboutUser = async (req, res) => {
  const matchedName = req.params.matchedName;
  try {
    const user = await User.findOne({ where: { username: matchedName } });
    const data = {
      username: req.params.matchedName
    };
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
