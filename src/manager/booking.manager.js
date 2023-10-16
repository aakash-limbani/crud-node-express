const { bookingDao } = require('../dao')
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')

const createBooking = async (req) => {
    // Create the booking with the provided details
    const createdRecord = bookingDao.createBooking(req.body)
    return createdRecord
}

const updateBookingById = async (bookingId, bookingPayload) => {
    return await bookingDao.updateBookingById(bookingId, bookingPayload)
}

const deleteBookings = async (bookingId) => {
    try {
        const booking = await bookingDao.deleteBooking(bookingId)
        return booking
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

const getList = async (req) => {
    const { page, limit } = req.query // Extract page and limit from the request query

    // Define the fields to select in the query result
    const selectFields =
    '_id personName numberOfPerson mobile bookingTime bookingType'

    // Retrieve the bookings list based on the filter, limit, and page
    const bookingList = await bookingDao.getList({}, limit, page, selectFields)

    // Return the bookings list as the response
    return bookingList
}

module.exports = {
    createBooking,
    getList,
    updateBookingById,
    deleteBookings
}
