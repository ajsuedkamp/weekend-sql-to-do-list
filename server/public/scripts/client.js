console.log('client sourced');

$(readyNow);

function readyNow() {
    console.log('JQ sourced');
    $('#add-task').on('click', postTasks);
    $('body').on('click', '.task-delete', deleteTask);
    getTasks();
    postTasks();
}

function deleteTask() {
    const taskID = $(this).data('id');
    $.ajax({
        type: 'DELETE',
        url: `/task/${taskID}`
    }).then(function(response) {
        getTasks();
    }).catch(function(error) {
        alert('Something went wrong!');
    })
}
function getTasks() {
    $('#task-description').val('');
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response)
        $('#taskTableBody').empty();
        for(let item of response) {
            // We now have item.id
            $('#taskTableBody').append(`
                 <tr>
                    <td>${item.task_description}</td>
                    <td>
                        <button class="task-complete" data-id="${item.id}">Complete</button>
                        <button class="task-delete" data-id="${item.id}">Delete</button>
                    </td>
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

