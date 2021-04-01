const Comment = require("../models/comment")

const isCommentOwner = async (req,res,next) => {
    const comment = await Comment.findById(req.params.cid).exec()
    if(comment.owner.id.equals(req.user.id))
    {
        next()
    }
    else
    {
        req.flash("error", "You don't have permission to do that!")
        res.redirect("back")
    }
}

module.exports = isCommentOwner