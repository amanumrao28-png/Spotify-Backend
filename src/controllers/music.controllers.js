const musicModel = require("../models/music.models");
const jwt = require("jsonwebtoken");
const {uploadImage}=require("../services/storage.services");
const albumModel=require("../models/album.models"); 

async function createMusic(req,res){


     const {title}=req.body;
    const file=req.file;
    const result=await uploadImage(file.buffer.toString("base64"));
    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id
    })
    res.status(201).json({
        message:"Music created successfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist
        }
    })
}
    
async function createAlbum(req,res){
   
        const {title,musics}=req.body;
        const album=await albumModel.create({
            title,
            artist:req.user.id,
            musics:musics
        })
        res.status(201).json({
            message:"Album created successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics
            }
        })

}
async function getAllMusics(req,res){
    const musics=await musicModel.find().skip(1).limit(10).populate("artist");
    res.status(200).json({
        message:"All musics fetched successfully",
        musics:musics
    })
}
async function getAlbums(req,res){
    try{
         const albums=await albumModel.find().select("title artist").populate("artist", "username email");
    res.status(200).json({
        message:"All albums fetched successfully",
        album:albums
    })
    }
   
catch(err){
        console.error("Actual Error:", err);
        return res.status(500).json({
            message: err.message
        });
    }
}
async function getAlbumById(req,res){
    const albumId=req.params.albumId;
    const album=await albumModel.findById(albumId).populate("artist", "username email").populate("musics");
    res.status(200).json({
        message:"Album fetched successfully",
        album:album
    })
}

module.exports={createMusic, createAlbum, getAllMusics, getAlbums, getAlbumById}