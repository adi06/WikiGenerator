/**
 * Created by karth on 4/15/2016.
 */
var socket = io();
var message_side;
(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side, this.id = arg.id;
        this.draw = function (_this) {
            return function () {
                var $message;

                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $like_link = ('<a id='+_this.id+'><i class="fa fa-thumbs-up"></i><span id="count'+_this.id+'">0</span></a>');
                $like_link.id = _this.id;
                $message.append($like_link);
                $('.messages').append($message);
                //console.log(this.id)
                $('#'+_this.id).click(function(){
                    //console.log(_this.id);
                    $val = $('#count'+_this.id).html();
                    $('#count'+_this.id).html(function(i, val) { return +val+1 });
                    $val = $('#count'+_this.id).html();
                    notifyLike({messageID: _this.id, like: $val});
                });
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
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

            socket.emit('input', {
                name: "Test",
                message: text
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
        socket.on('output', function(data){
            if(data.length){
                for(var x=0;x<data.length;x=x+1){
                    console.log(data[x].message);
                    message_side = message_side === 'left' ? 'right' : 'left';
                    message = new Message({
                        text: data[x].message,
                        message_side: message_side,
                        id: data[x]._id
                    });
                    message.draw();
                }
            }
        });

        //get likes
        socket.on('liked', function(data){
            $('#count'+ data.messageID).html(data.server_like);
        });

        //tag clicks
        $('.glyphicon-paperclip').click(function(){
            var color = $(this).css("background-color");
            if(color == 'rgb(230, 230, 230)' || color == 'rgb(255, 255, 255)'){
                $('.glyphicon-paperclip').css("background-color", "rgb(255, 255, 255)");
                $(this).css("background-color", "gray");
            }
            else{
                $(this).css("background-color", "white");
            }
        });
    });
}.call(this));

function notifyLike(data){
    socket.emit('like', {messageID: data.messageID, server_like: data.like});
};