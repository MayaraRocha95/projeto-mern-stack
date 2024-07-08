import { createService, findAllUserService } from "../services/news.service.js";

const create = async (req, res) => {
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

const findAll = async (req, res) => {
  const news = await findAllUserService();
  if (news.length === 0) {
    return res.status(400).send({ message: "There are no registered news" });
  }
  return res.send(news);
};

export { create, findAll };
