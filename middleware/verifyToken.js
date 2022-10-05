const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "you are not logged in",
      });
    }

    const decoder = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    req.user = decoder;

    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid token",
    });
  }
};
