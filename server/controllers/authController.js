import { registerSchema, loginSchema } from "../validations/authValidation.js";
import User from "../models/authModel.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  //   check if emaail or password exists
  if (!email.trim() || !password.trim())
    return res.status(400).send({ message: "Email or password are required" });

  // validation
  const result = loginSchema.validate(req.body);
  if (result.error)
    return res.status(400).send({ message: result.error.details[0].message });

  // check if email exists
  const user = await User.findOne({
    email,
  });
  if (!user)
    return res.status(401).send({ message: "User not found in this email" });

  // check if password is correct
  const isPasswordCorrect = await compare(password, user.password);
  if (!isPasswordCorrect)
    return res.status(400).send({ message: "Password is not correct" });

  // generate token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

  return res.status(200).send({
    message: "Successfully logged in",
    ok: true,
    token,
  });
};

const signUpHandler = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  //   check if emaail or password exists
  if (!email.trim() || !password.trim())
    return res.status(400).send({ message: "Email or password are required" });

  // validation
  const result = registerSchema.validate(req.body);
  if (result.error)
    return res.status(400).send({ message: result.error.details[0].message });

  // check if email is unique
  const user = await User.findOne({
    email,
  });
  if (user) return res.status(400).send({ message: "Email already exists" });

  // hash password
  const hashedPassword = await hash(password, 12);

  // create user
  const newUser = new User({ email, password: hashedPassword });
  const savedUser = await newUser.save();
  return res
    .status(200)
    .send({ message: "User created successfully", user: savedUser });
};

export { loginHandler, signUpHandler };
