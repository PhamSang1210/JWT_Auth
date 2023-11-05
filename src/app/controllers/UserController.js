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
        try {
            const user = await AuthModel.find({});
            res.status(201).json(user);
        } catch (error) {
            res.status(401).json(error);
        }
    }
}

export default new UserController();
