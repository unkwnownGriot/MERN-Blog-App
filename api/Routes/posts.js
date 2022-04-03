const router = require('express').Router()
const Post = require('../Models/Post')

// CREATE NEW POST
router.post('/',async (req,res)=>{
  const newPost = new Post(req.body)
  try{
    const savePost = await newPost.save()
    res.status(200).json(savePost)
  }catch(err){
      res.status(500).json(err)
  }
    
})


// UPDATE POST
router.put('/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
            const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{new:true})

            res.status(200).json(updatePost)

            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("you can update only your post")
        }
    }catch(err){
        res.status(500).json(err)
    }
    
})

// DELETE POST
router.delete('/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
                await post.delete()
                res.status(200).json("post deleted")
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("you can delete only your post")
        }
    }catch(err){
        res.status(500).json(err)
    }
    
})

// GET POST
router.get('/:id',async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id)
    const {__v,...others} = post._doc
    res.status(200).json(others)

    }catch(err){
        res.status(500).json(err)
    }
})

// GET ALL POST
router.get('/',async(req,res)=>{
    const username = req.query.user
    const catName = req.query.cat
    try{
        let posts
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({ categories: {
                $in: [catName]
            }})
        }else{
            posts = await Post.find()
        }

    res.status(200).json(posts)

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router