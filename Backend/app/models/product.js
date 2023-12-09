const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name connaot be empty']
    },
    price: {
        type: Number,
        required: [true, 'price cannot be empty'],
        min: 1
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    lastModifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product