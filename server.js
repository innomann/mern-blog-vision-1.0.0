const express = require("express");
require("dotenv").config(); // for loading environment variables
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const Cors = require("cors")
const app = express();

const Post= require("./models/Post")
const User = require("./models/User") 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Cors())

app.use(passport.initialize());
require("./middleware/passport")(passport);

const MONGO_URL = process.env.MONGO_URL;
mongoose
mongoose.connect(MONGO_URL, {useNewUrlParser:true,useUnifiedTopology: true})//Connect MongoDB
.then(() => console.log("Mongo successful connected"))
.catch(err => console.log(err.message));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

const users = require("./routes/api/user")
app.use("/api/users", users)

const posts = require("./routes/api/post")
app.use("/api/posts", posts)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});