console.log('client sourced');

$(readyNow);

function readyNow() {
    console.log('JQ sourced');
    $('#add-task').on('click', postTasks);
    getTasks();
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
            $('#taskTableBody').append(`
                 <tr>
                    <td>${item.task_description}</td>
                    <td>${item.complete}</td>
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
            task: $('#task-description').val() ,
            complete: 'N/A'
        }
    }).then(function (response) {
        getTasks();
    }).catch(function (error) { // Reject / failure
        console.log(error);
        alert('Something went wrong!');
    });
} // End postTasks function

