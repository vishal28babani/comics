const Comic = require("../models/comic")
const isComicOwner = async (req,res,next) =>{
    const comic = await Comic.findById(req.params.id).exec()
    if(comic.owner.id.equals(req.user.id)){
        next()
    }else{
        res.redirect("back")
    }
}

module.exports = isComicOwner