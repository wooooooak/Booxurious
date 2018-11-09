import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";
import User from "../../db/model/User";
import { generate, decodeToken } from "../../lib/jwt";

export const createAccount = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    const { username, email, socialProvider, profileImg } = matchedData(req);
    const user = await User.create({
      email,
      username,
      socialProvider,
      profileImg
    });
    const token = await generate({
      email,
      username,
      socialProvider,
      profileImg,
      userId: user.id
    });
    return res.json({ user, token });
  } catch (error) {
    return res.json({ message: error.name });
  }
};

export const loginSocialAccount = async (req, res) => {
  try {
    const { email, socialProvider } = req.body;
    const user = await User.findOne({ where: { email: email } });
    let token = "";
    console.log(" login Social");
    console.log(token);
    if (user) {
      token = await generate({
        socialProvider,
        email,
        username: user.username,
        profileImg: user.profileImg,
        userId: user.id
      });
      res.json({ user, code: 1, token: token });
    } else {
      res.json({ socialProvider, email, code: 2 });
    }
  } catch (err) {
    res.json(err);
  }
};
