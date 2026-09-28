import userAuthModel from "../model/auth.model.js";
import { verifyAccessToken } from "../utils/auth.utils.js";

async function authenticate(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
    });
  }

  try {
    const decode = verifyAccessToken(accessToken);

    const user = await userAuthModel.findById(decode.id);

    console.log("middelware user", user);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized, user not found",
      });
    }

    req.user = user; // full user document available in next handlers
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
}

export default authenticate;
