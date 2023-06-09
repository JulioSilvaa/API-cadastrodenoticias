import News from "../models/News.js";

const createNewsService = (body) => News.create(body);

const findAllNewsService = () => News.find().sort({ _id: -1 });

export { createNewsService, findAllNewsService };
