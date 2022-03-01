const express = require("express");

const Section = require("../model/section_model")

const router = express.Router();

router.post("", async(req,res) => 
{
    try{
        const section = await Section.create(req.body);
        return res.send(section);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
});

router.get("", async(req,res) => 
{
    try{
        const section = await Section.find().lean().exec();
        const data_count = await Section.countDocuments()
        return res.send({data_count,section});
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.get("/:id", async(req,res) => 
{
    try{
        const section = await Section.findById(req.params.id).lean().exec();
        return res.send(section);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})


router.patch("/:id", async(req,res) => 
{
    try{
        const section = await Section.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.send(section);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.delete("/:id", async(req,res) => 
{
    try{
        const section = await Section.findByIdAndDelete(req.params.id);
        return res.send(section);
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

module.exports = router;