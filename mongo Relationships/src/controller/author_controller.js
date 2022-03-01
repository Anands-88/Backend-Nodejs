const express = require("express");

const Author = require("../model/author_model")

const router = express.Router();

router.post("", async(req,res) => 
{
    try{
        const author = await Author.create(req.body);
        return res.send(author);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
});

router.get("", async(req,res) => 
{
    try{
        const author = await Author.find().lean().exec();
        const data_count = await Author.countDocuments()
        return res.send({data_count,author});
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.get("/:id", async(req,res) => 
{
    try{
        const author = await Author.findById(req.params.id).lean().exec();
        return res.send(author);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.patch("/:id", async(req,res) => 
{
    try{
        const author = await Author.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.send(author);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.delete("/:id", async(req,res) => 
{
    try{
        const author = await Author.findByIdAndDelete(req.params.id);
        return res.send(author);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

module.exports = router;