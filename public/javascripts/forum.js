$(document).ready(function () {

    $('#submit').click(function() {
        $.ajax({
            type: 'POST',
            url: '/api/chat',
            data: { question: $(".qn-1").text() },
            success: function(data)
            {
                console.log('success');
                window.location = "http://localhost:3000/api/chat";
            }
        });
    });

});/**
 * Created by karth on 4/18/2016.
 */
