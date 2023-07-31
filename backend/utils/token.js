const jwt = require("jsonwebtoken");
const createToken = async (userId) => {
  const payLoad = { userId };
  const token = await jwt.sign(payLoad, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  return token;
};

module.exports = { createToken };
