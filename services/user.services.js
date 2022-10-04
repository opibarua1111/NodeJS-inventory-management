const User = require("../models/User");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  console.log(user);
  return user;
};

exports.findUserByEmail = async (email) => {
  // console.log(User.findOne({ email }));
  return await User.findOne({ email });
};