const express = require("express")

const Product = require("../model/product_model")
const redis = require("../config/redis")

const router = express.Router();

router.post("",async(req,res) => {
    try{
        const product = await Product.create(req.body)
        const products = await Product.find().lean().exec() // to get all products and avoid to delete older created data

        redis.set("products",JSON.stringify(products))
        return res.send(201,product)
    }
    catch(err)
    {
        return res.send(500,err.message)
    }
})

router.get("", async(req,res) => {
    try{
         redis.get("products",async(err,getproducts)=>
        {
            if(err) return res.status(500).send("ERROR",err.message)
            if(getproducts) return res.status(201).send({products:JSON.parse(getproducts),redis:true})
       
            const product = await Product.find().lean().exec()
            redis.set("products",JSON.stringify(product))

            return res.send(200,{product,redis:false})
        })
    }
    catch(err)
    {
        return res.send(500,err.message)
    }
})

router.get("/:id",async(req,res) => {
    try{
        redis.get(`products.${req.params.id}`,async(err,getproducts)=>
        {
            if(err) return res.status(500).send("ERROR",err.message)
            if(getproducts) return res.status(201).send({products:JSON.parse(getproducts),redis:true})

            const product = await Product.findById(req.params.id).lean().exec()
            redis.set(`products.${req.params.id}`,JSON.stringify(product))
            return res.send(200,{product,redis:false})
        })
    }
    catch(err)
    {
        return res.send(500,err.message)
    }
})

router.patch("/:id",async(req,res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,
        {new:true})
        redis.set(`products.${req.params.id}`,JSON.stringify(product))

        const products = await Product.find().lean().exec()
        redis.set("products",JSON.stringify(products))


        return res.send(product)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

router.delete("/:id",async(req,res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        redis.del(`products.${req.params.id}`)

        const products = await Product.find().lean().exec()
        redis.set("products",JSON.stringify(products))

        return res.send(product)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

module.exports = router;