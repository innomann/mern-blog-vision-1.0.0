const express = require("express")
const router = express.Router()
const passport = require("passport")

const Post = require("../../models/Post")
const post = require("../../validation/post")
const validatePostInput = require("../../validation/post")

router.get("/",
//auth middleware will go here
 (req,res) => {
     Post.find({})
     .then(posts => res.status(200).json(posts))
     .catch(err => res.status(400).json({user: "Error fetching all posts"}))
})
router.get("/loggedin",
//auth middleware will go here
 (req,res) => {
     const author = "Birahinduka"
     Post.findOne({author: author})
     .then(posts => res.status(200).json(posts))
     .catch(err => res.status(400).json({user: "Error fetching posts of a loged in user"}))
})

router.get("/post/:id", (req,res) =>{
    Post.find({_id:req.params.id})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json({id: "Error fetching post by id"}))
})

router.get("/author/:author",(req,res) => {
    Post.find({author: req.params.author})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json({Error: "Error fetching post of a specific user"}))
})

router.post("/create",
//auth middleware will go here
 (req,res) => {
     const author = "Birahinduka";
     const post = req.body;
     const {errors,isValid} = validatePostInput(req.body)
     if(!isValid){
         return res.status(400).json(errors)
     }
     post.author = author;
     const newPost = new Post(post)
     newPost.save()
     .then(doc => res.json(doc))
     .catch(err => console.log({error: "Error creating a new post"}))
    
})

router.patch("/update/:id",
passport.authenticate("jwt",{ session:false}),
(req,res) => {
    const author = req.user.user_name
    const {errors,isValid} = validatePostInput(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }
    const {title,body} = req.body
    Post.findOneAndUpdate({author, _id: req.params.id}, {$set: {title,body}}, {new: true})
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(400).json({Update: "Error updating post"}))
})

router.delete("/delete/:id",
// authentication midddleware will go here
(req,res) => {
    Post.findOneAndDelete({_id:req.params.id})
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(400).json({Delete: "Error deleting post"}))
})

module.exports = router