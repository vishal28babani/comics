const mongoose = require("mongoose");

const comicSchema = mongoose.Schema({
    title: String,
    description: String,
    author: String,
    publisher: String,
    date: Date,
    series: String,
    issue: Number,
    genre: String,
    color: Boolean,
    image: String,
    owner: {
        username: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    upvote: [String],
    downvote: [String]
})

comicSchema.index({
    '$**' : 'text'
})

const Comic = mongoose.model("Comic",comicSchema)

module.exports = Comic