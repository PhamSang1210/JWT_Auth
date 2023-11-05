import mongoose from "mongoose";
const Shema = mongoose.Schema;
import moment from "moment-timezone";
const time = moment
    .tz(Date.now(), "Asia/Ho_Chi_Minh")
    .format("DD-MM-YYYY HH:mm:ss");

const AuthUser = new Shema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    admin: { type: Boolean, default: false },
    createdAt: { type: String, default: time },
    updateAt: { type: String, defaut: time },
});

export default mongoose.model("AuthModelUser", AuthUser);
