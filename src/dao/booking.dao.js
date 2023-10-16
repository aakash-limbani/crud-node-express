const httpStatus = require('http-status')
const { Booking } = require('../models')
const ApiError = require('../utils/ApiError')

// Define the fields you want to include in the response
const selectedFields = [
    'id',
    'personName',
    'numberOfPerson',
    'mobile',
    'bookingTime',
    'bookingType'
]

const createBooking = async (bookingBody, session = null) => {
    // Check if the provided email is already taken
    // if (await Booking.isEmailTaken(bookingBody.email)) {
    //   throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    // }

    // Create a new User instance with the provided bookingBody
    const document = new Booking(bookingBody)

    // If a session is provided, use it for the transaction
    if (session) {
        await document.save({ session })
    } else {
        // If no session is provided, save the document without a transaction
        await document.save()
    }

    // Create an object with the selected fields from the booking object
    const selectedUser = {}
    selectedFields.forEach((field) => {
        selectedUser[field] = document[field]
    })

    // Return the newly created booking with selected fields
    return selectedUser
}

const deleteBooking = async (_id) => {
    return await Booking.deleteMany({ _id })
}

const getBookingById = async (id) => {
    return await Booking.findById(id)
}

const updateBookingById = async (bookingId, updatePayload, session = null) => {
    const document = await getBookingById(bookingId)
    // Check if a booking was found
    if (!document) {
        // If no booking is found, throw a "NOT_FOUND" error with an appropriate message
        throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found')
    }

    // Update the booking object with the provided details
    Object.assign(document, updatePayload)

    // If a session is provided, use it for the transaction
    if (session) {
        await document.save({ session })
    } else {
    // If no session is provided, save the document without a transaction
        await document.save()
    }

    // Return the newly created booking with selected fields
    return document
}

const getList = async (filter = {}, limit = 10, page = 1, selectForm = '') => {
    // Define options for paginating bookings
    const options = {
        sortBy: 'createdAt : desc', // Sort bookings by creation date in descending order
        limit, // Number of bookings to fetch per page
        page, // Page number to retrieve
        selectForm // Specify fields to select in the query result (if provided)
    }

    // Use Mongoose's pagination method to retrieve bookings based on the filter and options
    const result = await Booking.paginate(filter, options)

    // Return the paginated result, which includes user data and pagination information
    return result
}

module.exports = {
    createBooking,
    getList,
    updateBookingById,
    deleteBooking
}
