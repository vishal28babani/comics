const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({ 
    text: String,
    comicId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comic"
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment