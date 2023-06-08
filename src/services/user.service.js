import User from "../models/User.js";

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findUserService = (id) => User.findById(id);

const updateUserService = (id, name, username, email) =>
  User.findByIdAndUpdate({ _id: id }, { name, username, email });

export default {
  createService,
  findAllService,
  findUserService,
  updateUserService,
};
