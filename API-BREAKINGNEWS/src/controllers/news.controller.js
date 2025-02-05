import {
  createService,
  findAllUserService,
  CountNews,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
} from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    return res.send(201);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const findAll = async (req, res) => {
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

    const news = await findAllUserService(offset, limit);
    const total = await CountNews();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0) {
      return res.status(400).send({ message: "There are no registered news" });
    }
    return res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const topNews = async (req, res) => {
  try {
    const news = await topNewsService();

    if (!news) {
      return res.status(400).send({ message: "There are no registered news" });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdService(id);

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const searchByTitle = async (req, res) => {
  try{

    const { title } = req.query;
    const news = await searchByTitleService(title);

    if(news.length === 0){
      return res.status(400).send({ message: "There are no registered news" });
    }

    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar,
      })),
    })

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export const byUser = async (req, res) => {
  try{
     const id = req.userId;
     const news =  await byUserService(id)

     return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar,
      })),
    })
  }  catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export const update = async (req, res) => {
  try{
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title || !text || !banner) {
      return res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    const news = await findByIdService(id);
    if(news.user._id != req.userId){
      return res.status(401).send({ message: "You are not authorized to update this news" });
    }

    await updateService(id, title, text, banner);

    return res.send("News updated successfully");
  }catch (error) {
    return res.status(500).send({ message: error.message });
  }
};