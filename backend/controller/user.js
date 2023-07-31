const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const { createToken } = require("../utils/token");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.statusCode = 400;
    throw new Error("firstName, lastName, email and password is required");
  }
  // const userExists = await User.findOne({ email });
  // if (userExists) {
  //   res.statusCode = 409;
  //   throw new Error("User already exists");
  // }
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = await createToken(user._id).catch((error) => {
      res.statusCode = 500;
      throw new Error(error);
    });

    const resUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    };
    res.status(201).json({ user: resUser });
  } else {
    res.statusCode = 400;
    throw new Error("Invalid user data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.statusCode = 400;
    throw new Error("email and password is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.statusCode = 400;
    throw new Error("User does not exist");
  }
  const passwordVerified = await bcrypt.compare(password, user.password);
  if (passwordVerified) {
    const token = await createToken(user._id).catch((error) => {
      res.statusCode = 500;
      throw new Error(error);
    });
    const resUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    };
    res.status(200).json({ user: resUser });
  } else {
    res.statusCode = 400;
    throw new Error("wrong email or password");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
