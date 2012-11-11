var socket = io.connect('http://localhost:8000');

socket.on('join', function (data) {
	$('#channel_box').text('Name: ' + data.name + '\n');
});

$(document).keypress(function(e) {
	if (e.which == 13) {
		socket.emit('say', {msg: $('#text_input').val()});
		$('#text_input').val('');
	}
});

socket.on('msg', function(data) {
	$('#channel_box').append(data.msg + '\n');
});


$(document).ready(function() {
	$('#text_input').focus();
});
