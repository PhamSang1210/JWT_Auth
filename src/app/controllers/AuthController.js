import { genatorToken } from "../../config/genatorToken.js";
import { optionCookie } from "../../config/optionCookie.js";
import AuthModel from "../model/AuthModel.js";
import bcrypt, { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";

let refreshTokens = [];
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
                const accessToken = genatorToken(
                    user,
                    process.env.JWT_ACCESSTOKEN,
                    "30m"
                );
                const refreshToken = genatorToken(
                    user,
                    process.env.JWT_REFRESHTOKEN,
                    "7d"
                );
                res.cookie("refreshToken", refreshToken, optionCookie);

                const { email, password, ...others } = user._doc;
                res.status(201).json({ ...others, accessToken });
            }
        } catch (error) {
            res.status(401).json(error);
        }
    }

    requestRefreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) res.status(301).json("ERROR");

        jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN, (err, user) => {
            if (err) console.log(err);

            const newAccessToken = genatorToken(
                user,
                process.env.JWT_ACCESSTOKEN,
                "30m"
            );
            const newRefreshToken = genatorToken(
                user,
                process.env.JWT_REFRESHTOKEN,
                "7d"
            );
            res.status(201).json({ accessToken: newAccessToken });
        });
    }

    logOut(req, res) {
        res.clearCookie("refreshToken");
        res.status(201).json("Logged out successfully!");
    }
}

export default new AuthController();
