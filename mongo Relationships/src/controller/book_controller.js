const express = require("express");

const Book = require("../model/book_model")
// const Author = require("../model/author_model")

const router = express.Router();

router.post("", async(req,res) => 
{
    try{
        const book = await Book.create(req.body);
        return res.send(book);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
});

router.get("", async(req,res) => 
{
    try{
        const book = await Book.find()
        .populate({ path: "section_id", select: "name" })
        .populate({ path: "author_id", select: ["first_name","last_name"]})
        .lean().exec();
        const data_count = await Book.countDocuments()
        return res.send({data_count,book});
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.get("/author/:author_id", async(req,res) => 
{
    try{
        const book = await Book.find({author_id:req.params.author_id})  
        .populate({ path: "section_id", select: "name" })
        .populate({ path: "author_id", select: ["first_name","last_name"]})
        .lean().exec();
        return res.send(book);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.get("/section/:section_id", async(req,res) => 
{
    try{
        const book = await Book.find({section_id:req.params.section_id})  
        .populate({ path: "section_id", select: "name" })
        .populate({ path: "author_id", select: ["first_name","last_name"]})
        .lean().exec();
        return res.send(book);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.get("/section/:section_id/author/:author_id", async(req,res) => 
{
    console.log("SECTION",req.params.section_id,"AUTHOR",req.params.author_id)
    try{
        const book = await Book.find({$and:[{section_id:req.params.section_id},{author_id:req.params.author_id}]})  
        .populate({ path: "section_id", select: "name" })
        .populate({ path: "author_id", select: ["first_name","last_name"]})
        .lean().exec();
        return res.send(book);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})


router.patch("/:id", async(req,res) => 
{
    try{
        const book = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.send(book);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.delete("/:id", async(req,res) => 
{
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        return res.send(book);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

module.exports = router;