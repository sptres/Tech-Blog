const router = require('express').Router();
const { Post } = require('../../models/');
const auth = require('../../utils/auth');

// create new post but only if user is logged in
router.post('/', auth, async (req, res) => {
  const body = req.body;

  try {
    // attach the userId to the post that's being created
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit post
router.put('/:id', auth, async (req, res) => {
  try {
    // create [updated] to later check if anything has been updated via edit or not
    const [updated] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // if anything has been updated, finish the edit, if not, finish the edit (no change) anyways
    if (updated > 0) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const [updated] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (updated > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
