import {
  createNewsService,
  findAllNewsService,
} from "../services/news.service.js";

const createNews = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.sendStatus(400).send({ message: "Preencha todos os campos" });
    }

    await createNewsService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.send(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAllNews = async (req, res) => {
  try {
    const news = await findAllNewsService();
    if (news.length === 0) {
      return res.status(400).send({ message: "não há noticias cadastradas" });
    }
    res.send(news);
  } catch (error) {}
};

export { createNews, findAllNews };
