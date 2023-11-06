import jwt from "jsonwebtoken";

class VerifyToken {
    verifyToken(req, res, next) {
        const token = req.headers.token;
        if (token) {
            const userToken = token.split(" ")[1];
            jwt.verify(userToken, process.env.JWT_ACCESSTOKEN, (err, user) => {
                if (err) {
                    res.status(301).json(err);
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json("You're not authenticated");
        }
    }
}

export default new VerifyToken();
