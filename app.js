const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000

const homeStartingContent = "Nam cursus mi quis mi malesuada pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in enim felis. Aenean elementum eleifend velit sed sagittis. Nulla at velit quis neque vulputate ornare a in lorem. Nulla ornare posuere elit in posuere. Donec varius posuere neque non pharetra. Praesent augue purus, feugiat ac aliquam at, posuere lobortis justo. Aenean quis ornare nisi. Nunc ornare, magna ut luctus feugiat, quam enim pretium tellus, at placerat libero quam ac odio. Maecenas risus metus, pellentesque sed pretium in, condimentum vel justo. Vivamus posuere nisi id magna interdum, et pharetra.";
const aboutContent = "Quisque venenatis vitae nisi nec sagittis. Duis molestie dapibus nisl, id euismod neque. Maecenas elementum ultrices odio. Vestibulum ornare tortor a imperdiet facilisis. Nullam egestas tellus vitae nibh tincidunt, ac lacinia diam imperdiet. Nunc pulvinar risus eu pharetra convallis. Nunc eu eleifend augue. Fusce a felis id dui posuere vulputate. Aenean condimentum vulputate nulla, quis porta tortor pretium vitae. Duis eget dui tincidunt, auctor dui at, ultrices ipsum. Quisque in varius metus, id ultricies enim. Aenean tincidunt, libero rhoncus sagittis convallis, orci arcu interdum ante, sit amet porta diam dolor vel leo. Aliquam erat volutpat. Nullam neque eros, rhoncus quis.";
const contactContent = "Aliquam vehicula quis arcu vitae mattis. Nulla ut aliquet nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque pulvinar tortor ac sapien semper, non dictum ex efficitur. In metus arcu, rutrum vitae lectus eget, ornare tempor ante. Vivamus placerat iaculis augue ac malesuada. Pellentesque imperdiet nunc at tempus ultrices. Donec lobortis vel ante in vestibulum. Morbi congue molestie gravida. Curabitur et magna leo. Nulla porttitor est pulvinar, commodo augue in, dictum eros. Aenean pellentesque mi nisl, vel fermentum ipsum efficitur non. Fusce lacinia tellus a erat mattis, quis dignissim metus rhoncus. Nulla a pulvinar nisl. Quisque ut.";


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set('strictQuery', true);

mongoose.connect(""); //Enter your own MongoDB Atlas connection link with your username and password here

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

// home page
app.get("/", function (req, res) {

    Post.find({}, function (err, posts) {
        res.render("home", { startingContent: homeStartingContent, posts: posts });
    });
});


// about page
app.get("/about", function (req, res) {

    res.render("about", { aboutContent: aboutContent });
})


// contact page
app.get("/contact", function (req, res) {

    res.render("contact", { contactContent: contactContent });
})


// compose page
app.get("/compose", function (req, res) {

    res.render("compose");
})


// post :postTitle
app.get("/posts/:postId", function (req, res) {

    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, function (err, post) {
        res.render("post", { title: post.title, content: post.content });
    });

});


app.post("/compose", function (req, res) {

    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
});


app.listen(port, function () {
    console.log("App listening at http://localhost:${port}");
});
