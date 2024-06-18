import express from "express";
import fs, { read } from "fs"; 

const router = express.Router();

// functions for reading and writing data
const readVideos = () => {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videosData = JSON.parse(videosFile);
    console.log(videosData);
    return videosData;
}

const writeVideos = (data) => {
    const convertedData = JSON.stringify(data);
    fs.writeFileSync("./data/videos.json", convertedData);
}

// routes for getting and posting
const videoListData = readVideos();

router.get("/", (_req, res) => {
    const filteredData = videoListData.map((video) => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image,
        };
    })
    res.json(filteredData);
})


router.get("/:id", (req, res) => {
    const { id } = req.params;
    const currentVideo = videoListData.find(video => video.id == id);

    if (!currentVideo) {
        return res.status(404).send("Video does not exist");
    }

    res.json(currentVideo);
})

export default router;