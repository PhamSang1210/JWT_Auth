import jwt from "jsonwebtoken";
import verifyToken from "./verifyToken.js";

class VerifyTokenAndAdmin {
    verifyTokenAndAdmin(req, res, next) {
        verifyToken.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.id) {
                next();
            } else {
                res.status(301).json("ERROR");
            }
        });
    }
}

export default new VerifyTokenAndAdmin();
