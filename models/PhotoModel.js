const mongoose = require("mongoose")

var Schema = mongoose.Schema
let PhotoModelSchema = new Schema({
    albumId: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('PhotoModel', PhotoModelSchema)