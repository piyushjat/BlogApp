// import the model
const Post = require("../models/postModel");


//business Logic

exports.createPost = async (req, res) => {
  try {
    
    const { title,body } = req.body;

    
    const post = new Post({ title,body });

    
    const savedPost = await post.save();

    
    
   res.json({
    post : savedPost,
   });
  } 
  
  catch (error) {
    return res.status(400).json({
        error:"Error while creating post"
    });
  }
};


exports.getAllPosts= async(req,res) => {
    try{

        const posts =await Post.find({}).populate([{ path: "Likes", strictPopulate: false }]);
        // .populate("Likes");

        return res.status(400).json({
          
            posts,
           })
    }
    catch (err) {
        return res.status(400).json({
            error:err.message

        });
      }
    
}