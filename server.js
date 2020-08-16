const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Get the host server port or set port to 3000
const port = process.env.PORT || 3000;

// Config and connect to mongoDB database
const uri = "mongodb+srv://admin:PASSWORD@ticketmanager-ahqhu.mongodb.net/SocialNetwork?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

mongoose.set('useFindAndModify', false);

// Create user model for database
let User = mongoose.model('User', new mongoose.Schema({
    username: String,
    nickname: String,
    email: String,
    password: String,
    created: Date,
    last_refresh: {type: Date, default: new Date()},
    activated: {type: Boolean, default: false},
    biography: {type: String, default: "SocialNetwork's user."},
    pic_name: {type: String, default: "default.png"},
    subscribers: {type: Number, default: 0},
    subscribers_name: Array,
    subscribtions: {type: Number, default: 0},
    subscribtions_name: Array
}));

// Create post model for database
let Post = mongoose.model('Post', new mongoose.Schema({
    sender: String,
    text: String,
    date: Date,
    likes: {type: Number, default: 0},
    comments: {type: Number, default: 0},
    liked_by: Array,
    comment_list: Array,
    tags: Array
}));

// Create tag model for database
let Tag = mongoose.model('Tag', new  mongoose.Schema({
    name: String,
    uses: Number
}))

exports.User = User;
exports.Post = Post;
exports.Tag = Tag;

// Get routes files
let user = require('./server/routes/user');
let post = require('./server/routes/post');
  
app.use(cors());
app.use(express.static(__dirname + "/dist/"));

// Set routes
app.use('/user', user);
app.use('/post', post);

// Send frontend file when user load the root page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

// Open server
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
