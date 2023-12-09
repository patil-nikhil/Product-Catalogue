const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('validator')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty']
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(value) {
                return validate.isEmail(value)
            },
            message: function() {
                return 'invalid email format'
            }
        }
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty']
    },
    role: {
        type: String,
        default: 'customer'
    }
})

userSchema.pre('save', async function(next) {
    const usersLength = await User.collection.countDocuments()
    if(usersLength == 0) {
        this.role = 'admin'
    }
    next()  
})

const User = mongoose.model('User', userSchema)

module.exports = User