import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import connect from "./config/db.js";
import route from "./routes/index.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT;

connect();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);
route(app);
app.listen(PORT, () => {
    console.log(`Listen at PORT: http://localhost:${PORT}`);
});
