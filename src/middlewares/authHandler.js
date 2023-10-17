const jwt = require("jsonwebtoken");

const authTokenHandler = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      let token = authHeader.split(" ")[1];
      if (!token) {
        return res
          .status(400)
          .json({ message: "User is not authorized or token is missing" });
      }

      jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
        if (error) {
          return res.status(401).json({ message: "User is not authorized" });
        }
        req.id = decode.id;
        next();
      });
    } else {
      return res.status(400).json({ message: "Invalid token format" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authTokenHandler;
