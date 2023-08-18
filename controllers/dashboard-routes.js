const router = require('express').Router();
const { User, Post, Comment } = require('../models/');
const auth = require ('../utils/auth');


// with auth function, it verifies the user is loggedin, and then renders the posts updated by that user. if error, send back to login page
router.get('/', auth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts-users', {
            // uses layout of dashboard handlebars and render all posts by the users 
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

// creating new post
router.get('/new', auth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

// edit post
router.get('/edit/:id', auth, async (req, res) => {
    try {
        // find the  post by id
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
        // in case of error, redirect to login
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;