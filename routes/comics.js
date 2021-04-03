//npm imports
const express = require("express")
const router = express.Router()

const isLoggedIn = require("../utils/isLoggedIn")
const isComicOwner = require("../utils/isComicOwner")

//models imports
const Comic = require('../models/comic')
const Comment = require('../models/comment')

//Search
router.get("/search", async (req,res)=>{
  try {
    const comics = await Comic.find({
      $text: {
        $search: req.query.term
      }
    })
    res.render("comics",{comics})
  } catch (error) {
    console.log(error)
    res.send("Error in comics search")
  }
})

//Genre
router.get("/genre/:name", async (req, res) => {
  try {
    const comics = await Comic.find({genre: req.params.name.toLowerCase()}).exec()
    res.render("comics", { comics });
  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

//Vote
router.post("/vote", isLoggedIn, (req,res)=>{
  console.log(req.body)
  res.json({message: "Voted!"})
})

//Index
router.get("/", async (req, res) => {
  try {
    const comics = await Comic.find().exec()
    res.render("comics", { comics });
  } catch (err) {
    console.log(err)
    res.send("Error in comics index")
  }
});

//New
router.get("/new", isLoggedIn, (req,res)=>{
  res.render("comics_new");
})

//Create
router.post("/", isLoggedIn, async (req,res)=>{
  const genre = req.body.genre.toLowerCase();
  const newComic = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    publisher: req.body.publisher,
    date: req.body.date,
    series: req.body.series,
    issue: req.body.issue,
    genre,
    color: !!req.body.color,
    image: req.body.image,
    owner: {
      id: req.user.id,
      username: req.user.username
    },
    upvote: [],
    downvote: []
  }
  try {
    const comic = await Comic.create(newComic)
    req.flash("success", `Comic created!`)
    res.redirect(`/comics/${comic.id}`);
  } catch (err) {
    req.flash("error", "Error creating comic")
    res.redirect("/comics")
  }
})

//Show
router.get("/:id", isLoggedIn, async (req,res) => {
  try {
    const comic = await Comic.findById(req.params.id).exec()
    const comments = await Comment.find({comicId: req.params.id}).exec()
    res.render("comics_show", { comic, comments, user: req.user });
  } catch (error) {
    console.log(error)
    res.send("Error in comics show")
  }
})

//Edit
router.get("/:id/edit", isLoggedIn, isComicOwner, async (req,res)=>{
  const comic = await Comic.findById(req.params.id).exec()
  res.render("comics_edit",{comic})
})

//Update
router.put("/:id", isLoggedIn, isComicOwner, async (req,res)=>{
  const genre = req.body.genre.toLowerCase();
  const newComic = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    publisher: req.body.publisher,
    date: req.body.date,
    series: req.body.series,
    issue: req.body.issue,
    genre,
    color: !!req.body.color,
    image: req.body.image
  }
  try {
    await Comic.findByIdAndUpdate(req.params.id, newComic, {new:true}).exec()
    req.flash("success", `Comic updated!`)
    res.redirect(`/comics/${req.params.id}`)
  } catch (error) {
    req.flash("error", `Error in updating comic!`)
    console.log(error)
    res.redirect("back")
  }
})

//Delete
router.delete("/:id", isLoggedIn, isComicOwner, async (req,res)=>{
  try {
    await Comment.deleteMany({comicId: req.params.id})
    await Comic.findByIdAndDelete(req.params.id).exec()
    req.flash("success", `Comic deleted!`)
    res.redirect("/comics")
  } catch (error) {
    console.log(error)
    req.flash("error", "Error in deleting comic")
    res.redirect("back")
  }
})

module.exports = router