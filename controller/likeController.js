// import the model
const Post = require("../models/postModel");
const Like= require("../models/likeModel");

//business Logic

exports.likePost = async (req, res) => {
  try {
    // fetch data from req body
    const { post,user } = req.body;

    // create a new Obj 
    const like = new Like({ post,user });

    //save the like in the new database
    const savedLike = await like.save();

    //find post by id
    const updatedPost = await Post.findByIdAndUpdate(post , {$push : {likes : savedLike._id}},{new:true}  )
    .populate("likes")//populate se id ke sath data bhi aata hai user ka varna populate hatane se id hi aati hai
    .exec();

    
   res.json({
    post : updatedPost,
   })
  } 
  
  catch (error) {
    return res.status(400).json({
        error:"Error while liking the post"
    });
  }
};

exports.unlikePost = async (req, res) => {
    try {
      
      const { post,like } = req.body;
        
      
       const deletedLike = await Like.findByIdAndDelete({post :post,_id:like} );
      
      const updatedPost = await Post.findByIdAndUpdate(post , {$pull : {likes : deletedLike._id}},{new:true}  ).populate("likes")//populate se id ke sath data bhi aata hai user ka varna populate hatane se id hi aati hai
      .exec();
  
      
     res.json({
      post : updatedPost,
     });
    } 
    
    catch (err) {
      return res.status(400).json({
          error:err.message,
      });
    }
  };
