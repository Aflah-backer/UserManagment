import User from "../models/Users.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//create
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
 
    const hash = bcrypt.hashSync(req.body.password, salt);
     const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    const savedUser=await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};

//Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(400, "user not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

//admin login
export const admin = async (req, res, next) => {
  try {
    const admin = await User.findOne({ email: req.body.email });
    if (!admin) return next(createError(400, "admin not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password!"));

    const token = jwt.sign(
      { id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = admin._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
