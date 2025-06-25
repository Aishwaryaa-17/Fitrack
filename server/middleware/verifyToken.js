//Verify the JWT token sent in the request header, decode it, 
// and attach the user info (usually id) to req.user so that protected routes can use it.

import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { //If the Authorization header is missing, user is not logged in → send 401 Unauthorized.
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1]; //Splits the header by space to get just the token part.

    if (!token) return next(createError(401, "You are not authenticated"));

    const decode = jwt.verify(token, process.env.JWT);
    req.user = decode;
    return next();
  } catch (err) {
    next(err);
  }
};

  
