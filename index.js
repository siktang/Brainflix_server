import express from "express";
import axios from "axios";
import fs from "fs";
import cors from "cors";
import "dotenv/config";

let { PORT } = process.env;
PORT = PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());



app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})