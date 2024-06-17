import express from "express";
import axios from "axios";
import fs from "fs";

const router = express.Router();

const base_url = "https://unit-3-project-api-0a5620414506.herokuapp.com";
const api_key = "?api_key=b61ec43f-16c2-4609-83d9-efae328d8e2e";

const getVideoList = async () => {
    try {
        const res = await axios.get(`${base_url}/videos${api_key}`);
        const videoList = JSON.stringify(res.data);
        fs.writeFileSync("../data/videos.json", videoList);
    } catch (error) {
        fs.writeFileSync("./error.log", error);
    }
}

getVideoList();

export default router;