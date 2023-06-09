import {
  countNews,
  createNewsService,
  findAllNewsService,
  findMainNewsService,
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
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }
    if (!offset) {
      offset = 0;
    }
    const news = await findAllNewsService(limit, offset);
    const total = await countNews();
    const currentUrl = req.baseUrl;

    const nextPage = offset + limit;
    const nextUrl =
      nextPage < total
        ? `${currentUrl}?limit=${limit}&offset=${nextPage}`
        : null;

    const preview = offset - limit < 0 ? null : offset - limit;
    const previewUrl =
      preview != null ? `${currentUrl}?limit=${limit}&offset=${preview}` : null;

    if (news.length === 0) {
      return res
        .sendStatus(400)
        .send({ message: "não há noticias cadastradas" });
    }
    res.send({
      nextUrl,
      previewUrl,
      limit,
      offset,
      total,
      results: news.map((item) => ({
        id: item.id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user?.name,
        username: item.user?.username,
        createdAt: item.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const mainNews = async (req, res) => {
  try {
    const mainNews = await findMainNewsService();

    if (!mainNews) {
      return res
        .sendStatus(400)
        .send({ message: "não há noticias cadastradas" });
    }

    res.send({
      news: {
        id: mainNews.id,
        title: mainNews.title,
        text: mainNews.text,
        banner: mainNews.banner,
        likes: mainNews.likes,
        comments: mainNews.comments,
        name: mainNews.user?.name,
        username: mainNews.user?.username,
        createdAt: mainNews.createdAt,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { createNews, findAllNews, mainNews };
