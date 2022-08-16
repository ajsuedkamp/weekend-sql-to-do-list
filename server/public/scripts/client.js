console.log('client sourced');

$(readyNow);

function readyNow() {
    console.log('JQ sourced');
    $('#add-task').on('click', postTasks);
    $('body').on('click', '.task-delete', deleteTask);
    $('body').on('click', '.task-complete', completeTask);
    getTasks();
    postTasks();
}

function completeTask() {
    const taskId = $(this).data('id');
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        getTasks();
    }).catch(function(error) {
        console.log(error);
        alert('Something went wrong!');
    });
}

function deleteTask() {
    const taskId = $(this).data('id');
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        getTasks();
    }).catch(function(error) {
        alert('Something went wrong!');
    });
}
function getTasks() {
    $('#task-description').val('');
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response)
        $('#taskTableBody').empty();
        for(let task of response) {
            // We now have task.id
            let taskClass = '';
            if(task.complete === true) {
                taskClass = 'complete';
            }
            $('#taskTableBody').append(`
                 <tr class="${taskClass}">
                    <td>${task.id}</td>
                    <td>${task.task_description}</td>
                    <td>
                        <button class="task-delete" data-id="${task.id}">Delete</button>
                        <button class="task-complete" data-id="${task.id}">Complete</button>

                    </td>
                    <td>${task.complete}</td>
                </tr>
            `);
        }
    }).catch(function (error) { // Reject / failure
        console.log(error);
        alert('Something went wrong!');
    });
} //End getTasks function

function postTasks() {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            task_description: $('#task-description').val() ,
        }
    }).then(function (response) {
        getTasks();
    }).catch(function (error) { // Reject / failure
        console.log(error);
        alert('Something went wrong!');
    });
} // End postTasks function

