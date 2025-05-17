const router = require('express').Router();

router.get('/', (req,res) => {res.send('Hello My Broda');});

router.use('/users', require('./users'));

module.exports = router;