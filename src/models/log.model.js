const mongoose = require('mongoose')

const logSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
            required: true
        },
        ip: {
            type: String,
            required: true
        },
        address: {
            city: {
                type: String
            },
            state: {
                type: String
            },
            timezone: {
                type: String
            },
            countryCode: {
                type: String
            },
            latitude: {
                type: String
            },
            longitude: {
                type: String
            },
            loginTime: {
                type: Date,
                default: new Date()
            }
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    }
)

/**
 * @typedef Log
 */
const Log = mongoose.model('log', logSchema)

module.exports = Log
