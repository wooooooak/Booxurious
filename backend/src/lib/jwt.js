import jwt from "jsonwebtoken";

import { jwtSecretKey } from "../secret.js";

export const generate = async (payload) => {
  try {
    const token = await jwt.sign(payload, jwtSecretKey, {
      expiresIn: "7d",
      issuer: "booxurious"
    });
    return token;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const decodeToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, jwtSecretKey);
    return decoded;
  } catch (error) {
    console.log(error);
    return error;
  }
};
