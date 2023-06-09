import {
  countNews,
  createNewsService,
  deleteNewsByIdService,
  findAllNewsService,
  findMainNewsService,
  findNewsByIdService,
  findNewsBySearchParamsServices,
  findNewsByUserService,
  updateNewsService,
} from "../services/news.service.js";

export const createNews = async (req, res) => {
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

export const findAllNews = async (req, res) => {
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

export const mainNews = async (req, res) => {
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

export const searchNewsByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await findNewsBySearchParamsServices(title);

    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: "Não encontramos noticia com esse titulo " });
    }

    res.send({
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

export const searchNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findNewsByIdService(id);

    if (!news) {
      return res
        .sendStatus(400)
        .send({ message: "não há noticias com esse ID" });
    }

    res.send({
      news: {
        id: news.id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user?.name,
        username: news.user?.username,
        createdAt: news.createdAt,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findAllNewsByUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await findNewsByUserService(id);

    res.send({
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

export const updateNews = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title || !text || !banner) {
      return res.sendStatus(400).send({ message: "Preencha todos os campos" });
    }

    const news = await findNewsByIdService(id);

    if (String(news.user.id) !== req.userId) {
      return res.status(400).send({
        message: "Você não possui permissão para atualizar esse post",
      });
    }

    await updateNewsService(id, title, text, banner);

    return res.send({ message: "Post atualizado com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findNewsByIdService(id);

    if (!news) {
      return res.status(400).send({
        message: "Noticia não encontrada",
      });
    }

    if (String(news.user.id) !== req.userId) {
      return res.status(400).send({
        message: "Você não possui permissão para apagar esse post",
      });
    }

    await deleteNewsByIdService(id);

    return res.send({ message: "Post excluído com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
