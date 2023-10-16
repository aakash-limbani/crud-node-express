const { Log } = require('../models')

/**
 * Create a log entry and save it in the database.
 * @param {Object} logBody - The log data to be saved.
 * @param {Object} [session={}] - The MongoDB session (optional, used for transactional operations).
 * @returns {Promise<Log>} - A promise that resolves to the saved log document.
 */
const createLog = async (logBody, session = null) => {
    // Create a new log document with the provided log data
    const log = new Log(logBody)

    // Save the log document in the database, optionally using a provided session
    await log.save(session)

    // Return the saved log document
    return log
}

module.exports = {
    createLog
}
