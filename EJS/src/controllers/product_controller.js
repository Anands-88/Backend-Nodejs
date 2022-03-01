const express = require('express'); 
const router = express.Router();
const Product = require('../models/product_model');
// const path = require('path');
// const upload = require('../middlewares/file-uploads');


const crudController = require('./crud.controller');

router.get('/new', async(req, res) => {
    return res.render("product/new.ejs")   
})

router.post('/single', async(req, res) => {
    console.log(req.body)
    try{
        const product = await Product.create(req.body)
        return res.render("product/single",{product})
    }
    catch(err){
        console.log("ERROR",err.message); res.send(err.message)
    }
})


router.get('',crudController(Product).get)

// router.patch('/:id',crudController(Product).patch)

// // router.post('',crudController(Product).post)

// router.delete('/:id',crudController(Product).deleteOne)

// router.post('/upload', upload.single("pic"), async(req, res) => {

//     try{
//         req.body.pic = req.file.path
//         const product = await Product.create(req.body)
//         res.send(req.file.path)
//     }
//     catch(err){console.log(err.message); res.send(err.message)}
// })
router.get('/:id', async(req, res) => {

    try{
        const product = await Product.findById(req.params.id)
        return res.render("product/single.ejs",{product})
    }
    catch(err){console.log(err.message); res.send(err.message)}
})

module.exports =router;