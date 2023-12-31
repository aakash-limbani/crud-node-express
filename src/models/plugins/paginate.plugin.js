/* eslint-disable no-param-reassign */

const paginate = (schema) => {
    /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
    /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
    schema.statics.paginate = async function (filter, options) {
        const sort = {}
        if (options.sortBy) {
            const parts = options.sortBy.split(':')
            sort[parts[0].trim()] = parts[1]?.trim().toLowerCase() === 'desc' ? -1 : 1
        }
        const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10
        const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1
        const populateCol = options.populate ? options.populate : ''
        const selectForm = options.selectForm ? options.selectForm : ''
        const skip = (page - 1) * limit

        const countPromise = this.countDocuments(filter).exec()
        let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit).exec()
        if (populateCol.length !== 0 && selectForm) {
            docsPromise = this.find(filter).select(selectForm).populate(populateCol).sort(sort).skip(skip).limit(limit).exec()
        } else if (populateCol.length !== 0) {
            docsPromise = this.find(filter).populate(populateCol).sort(sort).skip(skip).limit(limit).exec()
        } else if (selectForm) {
            docsPromise = this.find(filter).select(selectForm).sort(sort).skip(skip).limit(limit).exec()
        }

        return Promise.all([countPromise, docsPromise]).then((values) => {
            const [totalResults, results] = values
            const totalPages = Math.ceil(totalResults / limit)
            const result = {
                results,
                page,
                limit,
                totalPages,
                totalResults
            }
            return Promise.resolve(result)
        })
    }
}

module.exports = paginate
