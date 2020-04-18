const express = require('express');
const User = require("./userDb");
const Post = require("./../posts/postDb");

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  // Create new user
  try {
    const user = await User.insert(req.body);
    if (!user) {
      res.status(400).json({message: "Can't save user information"});
      return false;
    }
    res.status(201).json(user);
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to save new user."});
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // Create new post
  try {
    const post = await Post.insert({
      ...req.body,
      user_id: req.user.id
    });
    if (!post) {
      res.status(400).json({message: "Can't save this post information"});
      return false;
    }
    res.status(201).json(post);
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to save new post."});
  }
});

router.get('/', async (req, res) => {
  // Retrieve user list
  try {
    const users = await User.get();
    res.status(200).json(users);
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to retrieve  users."})
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // return current user by id
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // Retrieve list of post
  try {
    const posts = await User.getUserPosts(req.user.id);
    if (!posts) {
      res.status(404).json({message: "Posts not found"});
      return false;
    }
    res.status(200).json(posts);
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to retrieve posts."})
  }
});

router.delete('/:id', validateUser, async (req, res) => {
  // delete user by ID
  try {
    const user = await User.remove(req.params.id);
    if (!user) {
      res.send(400).json({message: "Can't delete user wth the specified ID"});
      return false
    }
    res.status(200).json({id: req.params.id});
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to delete  user."})
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // Update user info
  try {
    const result = await User.update(req.user.id, req.body);
    if (!result) {
      res.status(400).json({message: "Can't update user information"});
      return false;
    }
    const user = await User.getById(req.user.id);
    res.status(201).json(user);
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to update user information."});
  }

});

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if(!user) {
      res.status(400).json({message: "Invalid user id"});
      return false;
    }
    req.user = user;
    next();
  } catch(err) {
    console.error(err)
    res.status(500).json({message: "An error occurred while trying retrieve user data."})
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({message: "missing user data"});
    return false;
  }
  if (req.body && !req.body.name) {
    res.status(400).json({message: "missing required name field"});
    return false;
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({message: "missing post data"});
    return false;
  }
  if (req.body && !req.body.text) {
    res.status(400).json({message: "missing required text field"});
    return false;
  }
  next();
}

module.exports = router;
