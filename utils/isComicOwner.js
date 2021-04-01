const Comic = require("../models/comic")
const isComicOwner = async (req,res,next) =>{
    const comic = await Comic.findById(req.params.id).exec()
    if(comic.owner.id.equals(req.user.id)){
        next()
    }else{
        req.flash("error", "You don't have permission to do that!")
        res.redirect("back")
    }
}

module.exports = isComicOwner