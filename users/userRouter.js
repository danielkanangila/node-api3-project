const express = require('express');
const User = require("./userDb");

const router = express.Router();

router.post('/', async (req, res) => {
  // do your magic!
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

router.delete('/:id', validateUser, (req, res) => {
  // do your magic!
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
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
