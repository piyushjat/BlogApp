const express=require('express');
const router = express.Router();


const { createComment } = require('../controller/CommentController');
const { createPost,getAllPosts} = require("../controller/PostController");
const { likePost,unlikePost } = require('../controller/LikeController');

router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like",likePost);
router.put("/likes/unlike",unlikePost);

module.exports = router;
