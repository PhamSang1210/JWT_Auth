import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function genatorToken(user, JWT_TOKEN, time) {
    return jwt.sign(
        {
            username: user.username,
            id: user.id,
            admin: user.admin,
        },
        `${JWT_TOKEN}`,
        {
            expiresIn: `${time}`,
        }
    );
}
