import AuthModel from "../model/AuthModel.js";
import bcrypt, { genSalt, hash } from "bcrypt";

class AuthController {
    async register(req, res) {
        try {
            const salt = await genSalt(10);
            const hashedPassword = await hash(req.body.password, salt);

            const user = await new AuthModel({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
            });
            const newUser = await user.save();

            res.status(200).json(newUser);
        } catch (error) {
            res.status(301).json("ERROR");
        }
    }

    async login(req, res) {
        try {
            const user = await AuthModel.findOne({
                username: req.body.username,
            });
            const password = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!user) {
                res.status(301).json("WRONG USERNAME");
            }
            if (!password) {
                res.status(301).json("WRONG PASSWORD");
            }
            if (user && password) {
                res.status(201).json(user);
            }
        } catch (error) {
            res.status(401).json(error);
        }
    }
}

export default new AuthController();
