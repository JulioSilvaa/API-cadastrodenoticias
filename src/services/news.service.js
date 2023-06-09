import News from "../models/News.js";

export const createNewsService = (body) => News.create(body);

export const findAllNewsService = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNews = () => News.countDocuments();

export const findMainNewsService = () =>
  News.findOne().sort({ _id: -1 }).populate("user");

export const findNewsBySearchParamsServices = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

export const findNewsByIdService = (id) => News.findById(id).populate("user");

export const findNewsByUserService = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateNewsService = (id, title, text, banner) =>
  News.findByOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );
