const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(express.urlencoded({ extended: true }));

let taskArray = [
    {
        task: 'sweep the floor',
        complete: 'True'
    }
]

app.get('/tasks', (req, res) => {
    res.send(taskArray);
});

app.post('/tasks', (req, res) => {
    const task = req.body;
})

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
