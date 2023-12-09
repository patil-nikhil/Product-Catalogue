const Product = require('../models/product')

const productController = {}

productController.list = async (req, res) => {
    try {
        const product = await Product.find()
        res.json(product)
    } catch (error) {
        res.json(error)
    }
}

productController.create = async (req, res) => {
    try {
        const id = req.user.id
        const body = req.body
        const productObj = new Product(body)
        productObj.createdBy = id
        productObj.lastModifiedBy = id
        const product = await productObj.save()
        res.json(product)
    } catch (error) {
        res.json(error)
    }
}

productController.update = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const userId = req.user.id
        body.lastModifiedBy = userId
        const product = await Product.findByIdAndUpdate(id,body, {new: true, runValidators: true})
        res.json(product)
    } catch (error) {
        res.json(error)
    }
}

productController.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        res.json(product)
    } catch (error) {
        res.json(error)
    }
}

productController.show = async (req, res) => {
    try {
        const id = req.params.id
        const user = await Product.findById(id)
        if(user) {
            res.json(user)
        } else {
            res.json({
                errors: 'invalid User'
            })
        }
    } catch (error) {
        res.json({
            errors: 'invalid User'
        })
    }
}

module.exports = productController