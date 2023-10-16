const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const bookingSchema = mongoose.Schema(
    {
        personName: {
            type: String,
            required: false,
            trim: true
        },
        numberOfPerson: {
            type: Number,
            trim: true
        },
        mobile: {
            type: String,
            required: true
        },
        bookingType: {
            type: String,
            enum: ['ac', 'regular'],
            default: 'regular',
            required: true,
            trim: true
        },
        bookingTime: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// add plugin that converts mongoose to json
bookingSchema.plugin(toJSON)
bookingSchema.plugin(paginate)
// add plugin that converts mongoose to json
bookingSchema.plugin(require('mongoose-aggregate-paginate-v2'))

const Booking = mongoose.model('booking', bookingSchema)

Booking.aggregatePaginate.options = {
    customLabels: { docs: 'results', totalDocs: 'totalResults' }
}

module.exports = Booking
