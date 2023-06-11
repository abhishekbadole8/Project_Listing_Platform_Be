const jwt = require("jsonwebtoken");

const authTokenHandler = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      let token = authHeader.split(" ")[1];
      const decode = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (error, decode) => {
          if (error) {
            res.status(401);
            // res.send({ message: "User Is Not Authorized !!" });
            throw new Error("User Is Not Authorized !!");
          }
          req.id = decode.id;
          next();
        }
      );
      if (!token) {
        throw new Error("User Is Not Authorized Or Token Is missing");
      }
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = authTokenHandler;
