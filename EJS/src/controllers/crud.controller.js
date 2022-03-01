
const get = (model) =>async(req, res) => {
    try{
        const product = await model.find().lean()
        return res.render("product/all.ejs",{product})
    }
    catch(err)
    {
        console.log(err.message);
    }
}

const patch = (model) => async(req, res) => {
    const product = await model.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean()
    res.send(product)
}

const post = (model) => async(req, res) => {
    try{  const product = await model.create(req.body)
    res.send(product)
    }
    catch(err)
    {
        console.log(err.message);
        res.send(err.message)
    }
}

const deleteOne = (model) =>async(req, res) => {
    const product = await model.findByIdAndDelete(req.params.id).lean()
    res.send(product)
}

module.exports = (model) => {
    return{ 
        post: post(model),
        patch:patch(model),
        get: get(model),
        deleteOne: deleteOne(model)
    };
}