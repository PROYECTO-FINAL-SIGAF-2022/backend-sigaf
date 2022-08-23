// validate jwt
import jwt from "jsonwebtoken";

export default function validateToken(req, res, next) {
  const token = req.headers.Authorization;
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "No token provided.",
    });
  }
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Failed to authenticate token.",
      });
    }
    req.decoded = decoded;
    next();
  });
}
