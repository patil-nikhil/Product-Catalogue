const mongoose = require('mongoose')

const configDB = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/Product-Catalouge')
        console.log('Connected to DB')
    } catch (error) {
        console.log(error)
    }
}

module.exports = configDB