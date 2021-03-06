/**
 * Created by karth on 4/15/2016.
 */
var socket = io();
var message_side;
(function () {
    var Message;
    var tag_value = "none";
    var disp_like=0;
    var incoming_tag = "none";
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side, this.id = arg.id;
        this.draw = function (_this) {
            return function () {
                var $message;

                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $like_link = ('<a id='+_this.id+'><i class="fa fa-thumbs-up"></i><span id="count'+_this.id+'">'
                                                                                    + disp_like +'</span></a>');
                $like_link.id = _this.id;
                if(incoming_tag!="none") {
                    $message.append($like_link);
                }
                $('.messages').append($message);
           $('#'+_this.id).click(function(){
               var str = _this.text;
               var index = str.indexOf(":");
               var user = str.substring(0, index-1);
               var loggeduser  = $('.username').val();
               if(loggeduser!=user) {
                   $val = $('#count' + _this.id).html();
                   notifyLike({messageID: _this.id, like: $val});
               }
                });
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var qn_listener = $('.qn-id').val();
        var getMessageText, sendMessage;
        message_side = 'right';
        var getNode = function(s){
                return document.querySelector(s);
            },

            getMessageText = function () {
                var $message_input;
                $message_input = $('.message_input');
                return $message_input.val();
            };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }

            $('.message_input').val('');
            $messages = $('.messages');


            message = new Message({
                text: text
            });

            $.ajax({
                type: 'POST',
                url: '/api/chat/send',
                data: {"msg" : text,
                       "tag": tag_value,
                        "username": $('.username').val()},
                success: function(data)
                {
                    console.log('received msg',data);
                }
            });

            //message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            console.log("send click received");
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
        socket.on(qn_listener+'-output', function(data){
            $('.glyphicon-paperclip').css("background-color", "rgb(255, 255, 255)");
            if(data.length){
                for(var x=0;x<data.length;x=x+1){
                    message_side = message_side === 'left' ? 'right' : 'left';
                    message = new Message({
                        text: data[x].username + ' : ' +data[x].message,
			message_side: message_side,
                        id: data[x]._id
                    });
                    incoming_tag = data[x].tag;
                    disp_like = data[x].like;
                    message.draw();
                    tag_value = "none";
                }
            }
        });

        //get likes
        socket.on(qn_listener+'-liked', function(data){
            var curr_likes = parseInt(data.server_like)+1;
            $.ajax(
                $('#count'+ data.messageID).hide().html(curr_likes).fadeIn('fast')
            );
        });

        //tag clicks
        $('.glyphicon-paperclip').click(function(){
            var color = $(this).css("background-color");
            if(color == 'rgb(230, 230, 230)' || color == 'rgb(255, 255, 255)'){
                $('.glyphicon').css("background-color", "rgb(255, 255, 255)");
                $(this).css("background-color", "gray");
                tag_value = $(this).html();
            }
            else{
                tag_value = "none";
                $(this).css("background-color", "white");
            }
        });

        $('.glyphicon-time').click(function(){
            var color = $(this).css("background-color");
            if(color == 'rgb(230, 230, 230)' || color == 'rgb(255, 255, 255)'){
                $('.glyphicon').css("background-color", "rgb(255, 255, 255)");
                $(this).css("background-color", "gray");
                tag_value = $(this).html();
            }
            else{
                tag_value = "none";
                $(this).css("background-color", "white");
            }
        })

        $('.glyphicon-star').click(function(){
            var color = $(this).css("background-color");
            if(color == 'rgb(230, 230, 230)' || color == 'rgb(255, 255, 255)'){
                $('.glyphicon').css("background-color", "rgb(255, 255, 255)");
                $(this).css("background-color", "gray");
                tag_value = $(this).html();
            }
            else{
                tag_value = "none";
                $(this).css("background-color", "white");
            }
        })


        $('#wiki').click(function(){
            var questionId = $('.qn-id').val();
            $.ajax({
                type: 'GET',
                url: '/api/wiki/latest/'+questionId,
                success: function(data)
                {
                    console.log('received msg',data);
                    //window.location = "/api/wiki";
                     window.open("/api/wiki",'_blank');

                }
            });
        });

        $('#statistics').click(function(){
            $.ajax({
                type: 'GET',
                url: '/api/stat',
                success: function(data)
                {
                    window.open('/api/stat','_blank');
                }
            });
        });
    });
}.call(this));

function notifyLike(data){
    var questionId = $('.qn-id').val();
    var user_name = $('.username').val();
    socket.emit('like', {messageID: data.messageID, server_like: data.like, question: questionId, username: user_name});
};
