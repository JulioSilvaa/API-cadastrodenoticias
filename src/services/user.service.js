const User = require("../models/User");

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findUserService = (id) => User.findById(id);

const updateUserService = (id, name, username, email) =>
  User.findByIdAndUpdate({ _id: id }, { name, username, email });

module.exports = {
  createService,
  findAllService,
  findUserService,
  updateUserService,
};
