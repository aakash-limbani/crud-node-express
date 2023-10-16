const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const config = require('./config')
const { User, UserPermission } = require('../models')

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
    try {
        const user = await User.findById(payload.sub).populate([{ path: 'parentUser', select: 'email' }])
        const userPermission = await UserPermission.find({ userRole: user.userRole }).select('userModule add view edit delete isSuperAdmin isAdmin createdAt updatedAt')
        if (!user) {
            return done(null, false)
        }
        const userWithPermission = { user, userPermission }
        done(null, userWithPermission)
    } catch (error) {
        done(error, false)
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
    jwtStrategy
}
