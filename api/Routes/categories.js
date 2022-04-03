const router = require('express').Router()
const Category = require('../Models/Category')

// CREATE CATEGORY
router.post('/',async(req,res)=>{
    const newCat = new Category(req.body)
    try{
        const saveCat = await newCat.save()
        res.status(200).json(saveCat)

    }catch(err){
        res.status(500).json(err)
    }
})

// GET ALL CATEGORY
router.get('/',async(req,res)=>{
    try{
        const categories = await Category.find()
        res.status(200).json(categories)

    }catch(err){
        res.status(500).json(err)
    }
})




module.exports = router