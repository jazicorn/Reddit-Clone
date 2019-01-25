const express = require('express');
const router = express.Router();

const Post = require('../models/post');


module.exports = (app) => {
    // Home
    app.get('/', (req, res) => {
        res.render('home')
    })

    // Render Post Form
    app.get('/posts/form', (req,res) => {
        res.render('posts-new')
    })

    // CREATE
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });
};
