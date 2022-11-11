const Photo = require("../models/PhotoModel");

// fetch/GET route
exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({});
        return photos;
    } catch (error) {
        return "";
    }
}
