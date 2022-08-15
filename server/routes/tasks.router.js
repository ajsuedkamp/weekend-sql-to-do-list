const express = require('express');
const router = express.Router();

let taskArray = [
    {
        task: 'sweep the floor',
        complete: 'True'
    }
]

router.get('/', (req, res) => {
    res.send(taskArray);
});

router.post('/', (req, res) => {
    const task = req.body;
    // console.log(req.body);
    taskArray.push(task);
    res.sendStatus(201); // Send back success!
})


module.exports = router;