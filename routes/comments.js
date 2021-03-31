const express = require("express")
const router = express.Router({mergeParams: true})
const Comment = require("../models/comment")

const isLoggedIn = require("../utils/isLoggedIn")
const isCommentOwner = require("../utils/isCommentOwner")

//New
router.get("/new", isLoggedIn, (req,res)=>{
  res.render("comments_new",{comicId:req.params.id})
})

//Create
router.post("/", isLoggedIn, async (req,res)=>{
  try {
    await Comment.create({
    text: req.body.text,
    comicId: req.body.comicId,
    owner: {
      id: req.user.id,
      username: req.user.username
    }
    })
    res.redirect(`/comics/${req.body.comicId}`)
  } catch (error) {
    console.log(error)
    res.send("Error in comments create")
  }
})

//Edit
router.get("/:cid/edit", isLoggedIn, isCommentOwner, async (req,res)=>{
 try {
    const comment = await Comment.findById(req.params.cid).exec()
    res.render("comments_edit",{comment})
  } catch (err) {
   console.log(err)
   res.send("Error in comments edit") 
  }
})

//Update
router.put("/:cid", isLoggedIn, isCommentOwner, async (req,res)=>{
  try {
    await Comment.findByIdAndUpdate(req.params.cid, {text:req.body.text}, {new:true}).exec()
    res.redirect(`/comics/${req.params.id}`)
  } catch (error) {
    console.log(error)
    res.send("Error in comments update")
  }
})

//Delete
router.delete("/:cid", isLoggedIn, isCommentOwner, async (req,res)=>{
  try {
    await Comment.findByIdAndDelete(req.params.cid).exec()
    res.redirect(`/comics/${req.params.id}`)
  } catch (error) {
    console.log(error)
    res.send("Error in comment delete")
  }

})

module.exports = router