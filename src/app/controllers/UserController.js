import AuthModel from "../model/AuthModel.js";
import bcrypt, { genSalt, hash } from "bcrypt";

class UserController {
    async delete(req, res) {
        try {
            const user = await AuthModel.findById(req.params.id);
            res.status(201).json("SUCCESSFULLY");
        } catch (error) {
            res.status(401).json(error);
        }
    }

    async update(req, res) {
        try {
            const user = await AuthModel.updateOne(
                { _id: req.params.id },
                req.body
            );
            res.status(201).json(user);
        } catch (error) {
            res.status(401).json(error);
        }
    }

    async getAllUsers(req, res) {
        const page = req.query.page;
        const limit = req.query.limit;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        try {
            const user = await AuthModel.find({});
            const newUser = user.slice(startIndex, endIndex);
            const resultUsers = {};
            resultUsers.next = {
                page: page + 1,
                limit,
            };
            resultUsers.previous = {
                page: page - 1,
                limit,
            };
            resultUsers.results = newUser;
            res.status(201).json(resultUsers);
        } catch (error) {
            res.status(401).json(error);
        }
    }
}

export default new UserController();
