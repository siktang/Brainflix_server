import express from "express";
import fs from "fs";
import cors from "cors";
import videoRouter from "./routes/videos.js";
import "dotenv/config";

let { PORT } = process.env;
PORT = PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images',express.static("public"));
app.use("/videos", videoRouter); 


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})