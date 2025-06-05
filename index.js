const express = require("express");
const app = express();
const port = 3000;
let path = require("path");
const { v4: uuidv4 } = require('uuid');
let methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
});

let posts = [
    {
        id : uuidv4(),
        username : "prachi",
        content: "failing means you are working on something"
    },
    {
        id : uuidv4(),
        username : "prajwal",
        content: "don't lack in hardwork and you'll be successful"
    },
    {
        id : uuidv4(),
        username : "shruti",
        content: "hello there this is my first inertnship"
    },
    {
        id : uuidv4(),
        username : "jennie",
        content: "failure is a part of learning"
    }
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    let id =  uuidv4();
    let {username, content} = req.body;
    posts.push({id, username, content});
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find(post => post.id ===id);
    if (!post) {
        return res.status(404).send("Post not found!");
    }
    res.render("show.ejs", {post});
});
app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find(post => post.id === id);
    post.content = req.body.content;
    res.redirect("/posts");

});
app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((post)=>post.id == id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((post)=>post.id !== id);
    res.redirect("/posts");
});