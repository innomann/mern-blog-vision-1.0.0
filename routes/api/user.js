const express = require("express");
const router =  express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

const validateLoginInput = require("../../validation/signin")
const validateSignUpInput = require("../../validation/signup")
const User = require("../../models/User")

router.post("/signup", (req,res) => {
    const {errors,isValid} = validateSignUpInput(req.body)
    const {user_name,email,password} = (req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({$or: [{email}, {user_name}]}).then(user => {
        if(user){
            if(user.email === email){
                return res.status(400).json({emal:"User already exist"})
            }else{
                return res.status(400).json({user_name:"Username already exist"})
            }
        }else{
            const newUser = new User({ user_name, email, password });
            // hashing password before storing it in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .then(console.log("User succesesssiful created"))
                    .catch(err =>
                        console.log({ error: "Error creating a new user" })
                    );
                });
            });
        }
    })
})

router.post("/login", (req,res) => {
    const {errors,isValid} = validateLoginInput(req.body)
    if (!isValid){
        return res.status(400).json(errors)
    }

    const {email,password} = req.body
    User.findOne({email}).then(user => {
        if(!user){
            return res.status(400).json({email:"Email not found"})
        }
        bcrypt.compare(password,user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id: user._id,
                    user_name: user.user_name
                }
                jwt.sign(payload, SECRET, {expiresIn:3600}, (err,token) => {
                    if(err){
                        console.log(err)
                    }
                    console.log(token)
                    return res.json({
                        success:true,
                        token: "Bearer" + token
                    })
                })
            }else{
                return res.status(400).json({password:"Password incorrect"})
            }
        })
    })
})

module.exports = router;