const authorizeUser = async (req, res, next) => {
    if(req.permittedRoles.includes(req.user.role)) {
        next()
    } else {
        res.json('You do not have accesss to this route')
    }
}

module.exports = authorizeUser