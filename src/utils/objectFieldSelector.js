/**
 * Select specific fields from an object and return a new object.
 * @param {Object} document - The source object to select fields from.
 * @param {Array} selectedFields - An array of field names to select.
 * @returns {Object} - A new object containing the selected fields.
 */
function selectFields (document, selectedFields) {
    const selectedUser = {}
    selectedFields.forEach((field) => {
        selectedUser[field] = document[field]
    })
    return selectedUser
}

module.exports = selectFields
