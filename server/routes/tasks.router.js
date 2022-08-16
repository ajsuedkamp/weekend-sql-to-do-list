const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');  //Go up a directory to get to pool.js

let taskArray = [
    {
        task: 'sweep the floor',
        complete: 'True'
    }
]

router.get('/', (req, res) => {
    console.log('in GET /tasks');
    const queryText = 'SELECT * FROM "tasks";'; //what query to run
    //actually run the query
    //SELECT returns rows (array of data)
    pool.query(queryText).then((result) => {
        console.log('SELECT SUCESS!', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
        res.sendStatus(500); //Send client an error
    });
    // res.send(taskArray);
});

router.post('/', (req, res) => {
    const task = req.body;
    // console.log(req.body);
    taskArray.push(task);
    res.sendStatus(201); // Send back success!
})


module.exports = router;