import jwt from "jsonwebtoken";
import User from "../models/authModel.js";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "Authentication required" });
  }

  try {
    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    return res.status(401).send({ message: "Request is not authorized" });
  }
};
