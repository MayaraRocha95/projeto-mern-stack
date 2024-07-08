import News from "../models/News.js";

const createService = (body) => News.create(body);

const findAllUserService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");


const CountNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({ _id: -1 }).limit(5).populate("user");


export {
    createService,
    findAllUserService,
    CountNews,
    topNewsService
}