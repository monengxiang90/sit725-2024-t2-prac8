
$(document).ready(function() {
    // Initialize modal
    $('.modal').modal();

    function calculate(operation) {
        const num1 = $('#num1').val();
        const num2 = $('#num2').val();
        let expression;
        
        switch(operation) {
            case 'add':
                expression = `${num1} + ${num2}`;
                break;
            case 'subtract':
                expression = `${num1} - ${num2}`;
                break;
            case 'multiply':
                expression = `${num1} * ${num2}`;
                break;
            case 'divide':
                expression = `${num1} / ${num2}`;
                break;
        }

        const result = eval(expression);

        $.ajax({
            url: '/calculate',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ expression, result }),
            success: function(response) {
                console.log('Calculation response:', response); 
                $('#resultContainer').html(`<h5>Result: ${response.data.result}</h5>`);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    }

    function fetchHistory() {
        $.ajax({
            url: '/history',
            type: 'GET',
            success: function(response) {
                const historyList = $('#historyList');
                historyList.empty();
                if (response.data && Array.isArray(response.data)) {
                    response.data.forEach(item => {
                        historyList.append(`<li class="collection-item">${item.expression} = ${item.result}</li>`);
                    });
                    $('#historyDialog').modal('open');
                }
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    }

    function clearHistory() {
        $.ajax({
            url: '/history',
            type: 'DELETE',
            success: function(response) {
                $('#historyList').empty();
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    }

    $('#addBtn').click(function() {
        calculate('add');
    });

    $('#subtractBtn').click(function() {
        calculate('subtract');
    });

    $('#multiplyBtn').click(function() {
        calculate('multiply');
    });

    $('#divideBtn').click(function() {
        calculate('divide');
    });

    $('#historyBtn').click(function() {
        fetchHistory();
    });

    $('#clearHistoryBtn').click(function() {
        clearHistory();
    });

    // Socket.IO code for real-time random number display
    let socket = io();
    socket.on('number', (msg) => {
        console.log('Random number: ' + msg);
    });
});
