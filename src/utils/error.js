const httpStatus = require('http-status')
const config = require('../config/config')
const logger = require('../config/logger')
const ApiError = require('./ApiError')
const path = require('path')
const fs = require('fs')

const errorLogFilePath = path.join('error.log')
const errorLogStream = fs.createWriteStream(errorLogFilePath, { flags: 'a' })

const errorConverter = (err, req, res, next) => {
    let error = err
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message || httpStatus[statusCode]
        error = new ApiError(statusCode, message, false, err.stack)
    }
    next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err
    if (config.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    }

    res.locals.errorMessage = err.message

    const response = {
        code: statusCode,
        message,
        error: true,
        success: false,
        ...(config.env === 'development' && { stack: err.stack })
    }

    if (config.env === 'development') {
        logger.error(err)
    }

    errorLogStream.write(err.toString() + '\n')
    res.status(statusCode).send(response)
}

module.exports = {
    errorConverter,
    errorHandler
}
