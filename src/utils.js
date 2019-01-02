const { verify } = require('jsonwebtoken')

const APP_SECRET = 'GraphQL'

// class AuthError extends Error {
//     constructor() {
//         super('Not Authorized')
//     }
// }

function getUserId(context) {
    const Authorization = context.request.get('Authorization')
    if(Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const verifiedToken = verify(token, APP_SECRET)

        return verifiedToken && verifiedToken.userId
    }
    throw new Error('Not authenticated')
}

module.exports = {
    APP_SECRET,
    getUserId
}