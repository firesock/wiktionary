var socket = io.connect();

socket.on('join', function (data) {
	$('#channel_box').text('Name: ' + data.name + '\n');
});


var miliseconds = 2000;
$(document).keypress(function(e) {
	if (e.which == 13) {
		socket.emit('say', {msg: $('#text_input').val()});
		$('#text_input').val('');
		$('#text_input').attr('disabled', 'true');
		$('#text_input').val('WAIT FOR ' + miliseconds);
		setTimeout(function() {
			$('#text_input').val('');
			$('#text_input').removeAttr('disabled');
		}, miliseconds);
	}
});

socket.on('msg', function(data) {
	$('#channel_box').append(data.name + ': ' + data.msg + '\n');
	$('#channel_box').scrollTop($('#channel_box')[0].scrollHeight);
	$('img#img_area').attr('src', "");
	$('img#img_area').attr('src', data.msg);
});


$(document).ready(function() {
	$('#text_input').focus();
});
