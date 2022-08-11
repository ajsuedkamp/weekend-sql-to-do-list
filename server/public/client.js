console.log('client sourced');

$(readyNow);

function readyNow() {
    console.log('JQ sourced');
    $('#add-task').on('click', addTask);
}

let task = $('#task-description').val('');
function addTask() {
    $('#main').append(`
    <div class="task-created">
        <p>${task}</p>
        <button id="completeBtn">Complete</button>
        <button id="deleteBtn">Delete</button>
    </div>
    `);
}