const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    // SQL query to run
    const queryText = 'SELECT * FROM "tasks";';
    // Tell pool to run query
    pool.query(queryText).then((result) => {
        // SELECT returns rows (array of data)
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
        res.sendStatus(500);  //send client an error
    });
});


module.exports = router;