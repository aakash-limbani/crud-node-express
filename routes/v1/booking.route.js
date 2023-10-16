const express = require('express')
const validate = require('../../src/middlewares/validate')
const bookingValidation = require('../../src/validations/booking.validation')
const bookingController = require('../../src/controllers/booking.controller')

const router = express.Router()

router.post(
    '/',
    validate(bookingValidation.create),
    bookingController.createRecord
)

router.get('/', bookingController.listRecord)

router.patch(
    '/:id',
    validate(bookingValidation.update),
    bookingController.updateRecord
)

router.delete('/:id', bookingController.deleteRecord)

module.exports = router
