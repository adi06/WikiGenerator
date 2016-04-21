$(document).ready(function () {

    $('.star').on('click', function () {
        $(this).toggleClass('star-checked');
    });

    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    });

    $('#submit').click(function() {
        $.ajax({
            type: 'POST',
            url: '/api/chat',
            data: { question: $(".qn-1").text() },
            success: function(data)
            {

            }
        });
    });

});/**
 * Created by karth on 4/18/2016.
 */
