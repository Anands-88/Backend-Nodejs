const express = require("express");
const {body,validationResult} = require("express-validator")

const {confirmMail,toAdmins} = require("../mail_utils")
const EventEmitter = require("events")
const router = express.Router();

const eventEmit = new EventEmitter();

const User = require("../model/user_model");

router.post("/register",body("first_name").isString().isLength({min:3}).withMessage("Invalid Name!. should be length of 3"),
    body("last_name").isString().isLength({min:3}).withMessage("Invalid Name!. should be length of 3"),
    body('email').custom(async value => {
    const user = await User.findOne({email:value});
        if (user){
            throw new Error("Email already exists");
          }
          return true;
  })
    ,async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let newErrors;
            newErrors = errors.array().map((err) => {
                console.log("err", err);
                return { key: err.param, message: err.msg };
            });
            return res.status(400).send({ errors: newErrors });
        }
    
        eventEmit.on("User Registered to user",confirmMail)

        eventEmit.emit("User Registered to user",
        {
            from:"admins@gmail.com",
            to:`${req.body.email}`,
            user:`${req.body.first_name} ${req.body.last_name}`
        })
        eventEmit.on("User Registered to admins",toAdmins)

        eventEmit.emit("User Registered to admins",
        {
            from:"operation_team@gmail.com",
            to:"admin_1@gmail.com,admin_2@gmail.com,admin_3@gmail.com,admin_4@gmail.com,admin_5@gmail.com",
            user:`${req.body.first_name} ${req.body.last_name}`
        })

        const user = await User.create(req.body)
        return res.status(201).send(user)
    }
    catch(err)
    {
        return res.status(500).send(err)
    }
})

router.get("",async(req,res) =>
{
    const page = req.query.page || 1;
    const size = req.query.size || 10;
    try{
        const user = await User.find().skip((page-1)*size).limit(size).lean().exec() // 
        const total_page = Math.ceil(await User.find().countDocuments())
        return res.status(201).send([user,total_page])
    }
    catch(error)
    {
        return res.status(500).send(error)
    }
})

router.delete("",async(req,res) =>
{
    try{
        const user = await User.deleteMany()
        return res.status(200).send(user)
    }
    catch(error)
    {
        return res.send(500,err)
    }
})

module.exports = router;