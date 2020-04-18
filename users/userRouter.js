const express = require('express');
const User = require("./userDb");

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  // do your magic!
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

router.post('/:id/posts', validateUserId, async (req, res) => {
  // do your magic!
  
});

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const users = await User.get();
    res.status(200).json(users);
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to retrieve  users."})
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUser, async (req, res) => {
  // do your magic!
  try {
    const user = await User.remove(req.params.body);
    if (!user) {
      res.send(400).json({message: "Can't delete user wth the specified ID"});
      return false
    }
    res.status(200).json({id: req.params.id});
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while trying to retrieve  users."})
  }
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
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
}

module.exports = router;
