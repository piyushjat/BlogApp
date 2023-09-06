
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//business Logic

exports.createComment = async (req, res) => {
  try {
    
    const { post,user,body } = req.body;

    const comment = new Comment({ post,user,body });

    
    const savedComment = await comment.save();

    //find post by id
    const updatePost = await Post.findByIdAndUpdate(post , {$push : {comments : savedComment._id}},{new:true}  )
    .populate("comments")//populate the comments array with comment document
    .exec();

    // send a json response with a success flag
   res.json({
    post : updatePost,
   });
  } 
  
  catch (err) {
    return res.status(500).json({
        error:"Error while creating comment"
    });
  }
};
