import User from "../models/User.js";

const loginService = async (email) =>
  User.findOne({ email: email }).select("+password");

export default loginService;
