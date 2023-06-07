const User = require("../models/User");

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findUserService = (id) => User.findById(id);
module.exports = {
  createService,
  findAllService,
  findUserService,
};
