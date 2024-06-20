import { channel } from "diagnostics_channel";
import express from "express";
import fs, { read } from "fs"; 
import uniqid from "uniqid";

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

router.post("/", (req, res) => {

    const newVideo = {
        id: uniqid(),
        title: req.body.title,
        channel: "Chanel",
        image: req.body.image,
        description: req.body.description,
        views: 0,
        likes: 0,
        duration: "4:01",
        video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: []        
    }

    videoListData.push(newVideo);

    writeVideos(videoListData);
    
    res.status(201).json(newVideo);
})

export default router;