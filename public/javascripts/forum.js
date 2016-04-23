$(document).ready(function () {

    $('#submit').click(function() {
        $.ajax({
            type: 'POST',
            url: '/api/chat',
            data: { question: selected_qn, qncontent: $('.'+selected_qn+'-content').text()},
            success: function(data)
            {
                console.log('success');
                window.location = "/api/chat";
            }
        });
    });

    $('.media').click(function(){
        selected_qn = this.id;
        $('#'+this.id).toggleClass('back-change');
    });
});/**
 * Created by karth on 4/18/2016.
 */
