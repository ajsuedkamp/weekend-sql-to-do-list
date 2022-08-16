const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');  //Go up a directory to get to pool.js

// let taskArray = [
//     {
//         task: 'sweep the floor',
//         complete: 'True'
//     }
// ]

router.get('/', (req, res) => {
    // console.log('in GET /tasks');
    const queryText = 'SELECT * FROM "tasks";'; //what query to run
    //actually run the query
    //SELECT returns rows (array of data)
    pool.query(queryText).then((result) => {
        // console.log('SELECT SUCESS!', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
        res.sendStatus(500); //Send client an error
    });
    // res.send(taskArray);
});

router.post('/', (req, res) => {
    const task = req.body;
    const queryText = `INSERT INTO "tasks" ("task_description")
                       VALUES ($1);`
    // console.log(req.body);
    pool.query(queryText, [task.task_description])
        .then((results) => {
            console.log(results);
            res.send(results);
        })
        .catch((error) => {
            console.log('ERROR in POST /tasks', error);
            res.sendStatus(500);
        });
    // DO NOT SEND HERE, can only send one response
    // taskArray.push(task);
    // res.sendStatus(201); // Send back success!
});

router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM "tasks" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    const task = req.params.id;
    const queryText = `UPDATE "tasks" SET "complete" = TRUE
                       WHERE "id" = $1;`
    pool.query(queryText, [task])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
});


module.exports = router;