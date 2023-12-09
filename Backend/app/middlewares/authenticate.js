const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
    let token = req.headers['authorization']
    if(token) {
        try {
            const tokenData = jwt.verify(token, 'dct@123')
            req.user = {
                id: tokenData.id,
                role: tokenData.role
            }
            next()                   
        } catch (error) {
            res.json(error)
        }
    } else {
        res.json({
            errors: 'token not found'
        })
    }
}

module.exports = authenticateUser