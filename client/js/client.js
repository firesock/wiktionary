var socket = io.connect();

socket.on('join', function (data) {
	$('#channel_box').text('Name: ' + data.name + '\n');
});

socket.on('msg', function(data) {
	$('#channel_box').append(data.name + ': ' + data.msg + '\n');
	$('#channel_box').scrollTop($('#channel_box')[0].scrollHeight);
	$('img#img_area').attr('src', "");
	$('img#img_area').attr('src', data.msg);
});

$(document).ready(function() {
	var miliseconds = 2000;
	$('form#chat').submit(function(e) {
		e.preventDefault();
		
		socket.emit('say', {msg: $('#text_input').val()});
		$('#text_input').val('');
		$('#text_input').attr('disabled', 'disabled');
		$('#text_input').val('WAIT FOR ' + miliseconds);
		setTimeout(function() {
			$('#text_input').val('');
			$('#text_input').removeAttr('disabled');
			$('#text_input').focus();
		}, miliseconds);

	});
});
