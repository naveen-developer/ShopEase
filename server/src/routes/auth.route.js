import express from "express";
import bcrypt from "bcryptjs";
import userAuthModel from "../model/auth.model.js";
import {
  generateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.utils.js";
import validate from "../middleware/validate.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";

const route = express.Router();

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

route.post("/register", registerValidator, validate, async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password does not match!",
      });
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const user = await userAuthModel.create({
      name,
      email,
      password: encryptPassword,
    });

    console.log(user);

    res.status(201).json({
      message: "user registered successfully!",
      data: {
        user: {
          name,
          email,
          encryptPassword,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Unauthorized error " + error,
    });
  }
});

route.post("/login", loginValidator, validate, async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExist = await userAuthModel.findOne({ email });
    //    console.log(isUserExist);

    if (!isUserExist) {
      return res.status(400).json({
        message: "email id not exist please register!",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password,
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid email or password!",
      });
    }

    const { accessToken, refreshToken } = generateToken(isUserExist._id);

    console.log("Access Token", accessToken);
    console.log("Refresh Token", refreshToken);

    isUserExist.refreshToken = refreshToken;
    await isUserExist.save();

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    res.status(200).json({
      message: "Login successfully!",
      user: {
        id: isUserExist._id,
        email: isUserExist.email,
      },
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unauthorized " + error,
    });
  }
});

route.get("/metest", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  //  console.log(accessToken);
  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
    });
  }

  try {
    const decode = verifyAccessToken(accessToken);
    console.log("decode", decode);
    const user = await userAuthModel.findById(decode.id);

    res.status(200).json({
      message: "user fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
});

route.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  console.log("This is refresh Token ", refreshToken);

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refresh token not found",
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await userAuthModel.findById(decoded.id);

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();

      return res.status(401).json({
        message: "Unauthorized, refresh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(
      user._id,
    );

    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refresh token",
    });
  }
});

route.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await userAuthModel.findById(decoded.id);
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  }
});

export default route;
