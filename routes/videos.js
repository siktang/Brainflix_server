import express from "express";
import fs from "fs"; 

const router = express.Router();



// functions for reading and writing data
const readVideos = () => {
    const videosFile = fs.readFileSync("../data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData;
}

const writeVideos = (data) => {
    const convertedData = JSON.stringify(data);
    fs.writeFileSync("../data/videos.json", convertedData);
}


// routes for getting and posting

router.get("/", (req, res) => {
    const videoListData = readVideos();
    res.json(videoListData);
})


router.get("/:id", (req, res) => {
    const { id } = req.params;
    
})

export default router;