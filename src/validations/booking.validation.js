const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

const create = {
    body: Joi.object().keys({
        personName: Joi.string().required(),
        numberOfPerson: Joi.number().required(),
        mobile: Joi.string().required(),
        bookingType: Joi.string().valid('ac', 'regular').required(),
        bookingTime: Joi.string().required()
    })
}

const update = {
    body: Joi.object().keys({
        personName: Joi.string().required(),
        numberOfPerson: Joi.number().required(),
        mobile: Joi.string().required(),
        bookingType: Joi.string().valid('ac', 'regular').required(),
        bookingTime: Joi.string().required()
    })
}

module.exports = {
    create,
    update
}
