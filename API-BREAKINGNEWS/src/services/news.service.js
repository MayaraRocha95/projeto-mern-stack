import News from "../models/News.js";

const createService = (body) => News.create(body);

const findAllUserService = () => News.find();

export {
    createService,
    findAllUserService
}