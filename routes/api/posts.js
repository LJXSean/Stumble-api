// Forum area, like, comment etc

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// comment format: <REQ TYPE> <ENDPOINT>

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private (Have to be logged in to see the posts)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Private (Have to be logged in to see the posts)
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    // Ensures same error message for invalid post id
    if (error.kind === 'ObjectId') {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:post_id
// @desc    DELETE post by id
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).send({ msg: 'Post not found' });
    }

    // Check deletion is done by post owner (req.user.id is a string while post.user is ObjectId)
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // mongoose.remove() deprecated
    await Post.deleteOne({ _id: req.params.post_id });
    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    // Ensures same error message for invalid post id
    if (error.kind === 'ObjectId') {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Check if post already liked by user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    // Ensures same error message for invalid post id
    if (error.kind === 'ObjectId') {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // find index
    const index = post.likes.findIndex(
      (like) => like.user.toString() === req.user.id
    );

    if (index == -1) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    post.likes.splice(index, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).send({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    DELETE comment by id
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).send({ msg: 'Post not found' });
    }

    // Pull out comment
    const index = post.comments.findIndex(
      (comment) => comment.id === req.params.comment_id
    );
    if (index === -1) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    const comment = post.comments[index];

    // Check deletion is done by comment owner
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments.splice(index, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    // Ensures same error message for invalid post id
    if (error.kind === 'ObjectId') {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
