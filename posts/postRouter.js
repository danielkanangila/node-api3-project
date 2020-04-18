const express = require('express');
const Post = require("./postDb");

const router = express.Router();

router.get('/', async (req, res) => {
  // Retrieve posts
  try {
      const posts = await Post.get();
      if (!posts) {
        res.status(404).json({message: "Posts not found"})
      }
      res.status(200).json(posts)
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to retrieve posts."})
  }
});

router.get('/:id', validatePostId, (req, res) => {
  // Return post by ID
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, async (req, res) => {
  // Delete post by ID
  try {
    const result = await Post.remove(req.post.id);
    if (!result) {
      res.status(400).json({message: "Can't delete post with the specified ID"});
      return false;
    }
    res.status(200).json({id: req.params.id});
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to delete post with the specified ID."})
  }
});

router.put('/:id', validatePostId, async (req, res) => {
  // Update post
  try {
    const result = await Post.update(req.params.id, req.body);
    if (!result) {
      res.status(400).json({message: "Can't update post with the specified ID"});
      return false;
    }
    const post = await Post.getById(req.params.id);
    res.status(200).json(post);
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to update post with the specified ID."})
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  // do your magic!
  try {
    const post = await Post.getById(req.params.id);
    if(!post) {
      res.status(400).json({message: "Invalid post id"});
      return false;
    }
    req.post = post;
    next();
  } catch(err) {
    console.error(err)
    res.status(500).json({message: "An error occurred while trying retrieve post data."})
  }
}

module.exports = router;
