const router = require('express').Router();
const { User, Post, Comment } = require('../models/');

//get all posts that's been posted when homepage is loaded
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('allPosts', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('singlePost', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// render login page
router.get('/login', (req, res) => {
  // if logged in, send back to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// render signup page
router.get('/signup', (req, res) => {
  // if logged in, send back to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
