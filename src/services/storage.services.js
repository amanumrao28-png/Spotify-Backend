const {ImageKit} = require("@imagekit/nodejs");
require("dotenv").config();
const imagekitClient =new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})
async function uploadImage(file){
    const result=await imagekitClient.files.upload({
        file,
        fileName:"music"+Date.now(),
        folder:"yt-complete-backend/music"
    })
    return result;
}
module.exports={uploadImage}