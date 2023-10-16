const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { bookingManager } = require('../manager')
const ApiSuccessResponse = require('../utils/apiResponse')

// Function to create a Booking
const createRecord = catchAsync(async (req, res) => {
    const data = await bookingManager.createBooking(req)
    res
        .status(httpStatus.CREATED)
        .send(
            new ApiSuccessResponse(data,
                httpStatus.CREATED,
                'Booking Created successfully'
            ))
})

// Function to retrieve a list booking
const listRecord = catchAsync(async (req, res) => {
    const data = await bookingManager.getList(req)
    res
        .status(httpStatus.OK)
        .send(
            new ApiSuccessResponse(data, httpStatus.OK, 'Bookings Retrieved successfully')
        )
})

// Function to retrieve a update booking
const updateRecord = catchAsync(async (req, res) => {
    const data = await bookingManager.updateBookingById(req.params.id, req.body)
    res
        .status(httpStatus.OK)
        .send(
            new ApiSuccessResponse(
                data,
                httpStatus.OK,
                'Booking Details updated successfully'
            )
        )
})

// Function to retrieve a delete booking
const deleteRecord = catchAsync(async (req, res) => {
    const data = await bookingManager.deleteBookings(req.params.id)
    res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'Booking deleted successfully'))
})

module.exports = {
    createRecord,
    listRecord,
    deleteRecord,
    updateRecord
}
