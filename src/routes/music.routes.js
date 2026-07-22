const express = require("express");
const musicController = require("../controllers/music.controllers");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware");
const  upload =multer({storage:multer.memoryStorage()});
// multer.memoryStorage() is used to store the uploaded files in memory as Buffer objects. This is useful when you want to process the files directly in your application without saving them to disk. In this case, it allows you to upload music files and handle them in memory before sending them to a storage service or database.
const router = express.Router();
router.post("/upload",  authMiddleware.authArtist,upload.single("music"), musicController.createMusic);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);
router.get("/", authMiddleware.authUser, musicController.getAllMusics);
router.get("/album", authMiddleware.authUser, musicController.getAlbums);
router.get("/album/:albumId", authMiddleware.authUser, musicController.getAlbumById);
module.exports = router;