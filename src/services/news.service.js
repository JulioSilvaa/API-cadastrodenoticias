import News from "../models/News.js";

const createNewsService = (body) => News.create(body);

const findAllNewsService = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNews = () => News.countDocuments();

export { countNews, createNewsService, findAllNewsService };
