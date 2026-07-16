import type { Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../lib/utils/generateToken.lib";
import errorHandler from "../lib/utils/errorHandler.lib";
import { ENV_VARS } from "../lib/env/envVars.lib";
import type { AuthRequest } from "../types/interfaces.types";
export const signup = async (req: AuthRequest, res: Response) => {
  try {
    const { userName, password, confirmPassword } = req.body;

    if (
      typeof userName !== "string" ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return res.status(400).json({ error: "Invalid data type" });
    }

    const tUserName = userName.trim(),
      tPassword = password.trim(),
      tConfirmPassword = confirmPassword.trim();
    if (!tUserName || !tPassword || !tConfirmPassword) {
      return res.status(403).json({ error: "Please provide all fields" });
    }

    if (tPassword.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    if (tUserName.length < 4 || tUserName.length > 16) {
      return res.status(400).json({
        error:
          "Username must be at least 4 characters long and no more than 16",
      });
    }

    if (tPassword !== tConfirmPassword) {
      return res
        .status(400)
        .json({ error: "Password confirmation does not match" });
    }

    const isUserExists = await User.findOne({ userName: tUserName });

    if (isUserExists) {
      return res.status(400).json({ error: "This username is already taken" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(tPassword, salt);

    const newUser = new User({
      userName: tUserName,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        fullName: newUser.fullName,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImage: newUser.profileImage,
        coverImage: newUser.coverImage,
        bio: newUser.bio,
        link: newUser.link,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { userName, password } = req.body;

    if (typeof userName !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid data type" });
    }

    const tUserName = userName.trim(),
      tPassword = password.trim();

    if (!tUserName || !tPassword) {
      return res.status(403).json({ error: "Please provide all fields" });
    }

    const user = await User.findOne({ userName: tUserName });

    if (!user || !user.password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      _id: user._id,
      userName: user.userName,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImage: user.profileImage,
      coverImage: user.coverImage,
      bio: user.bio,
      link: user.link,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const logout = (req: AuthRequest, res: Response) => {
  const { NODE_ENV } = ENV_VARS;
  try {
    res.clearCookie("secret_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: NODE_ENV === "production",
    });
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const checkAuth = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};
