const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString(); // Format the date as ISO string
    res.send({ msg: 'Hello world !',  currentDateTime: formattedDate })
})

module.exports = router
