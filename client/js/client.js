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

var miliseconds = 2000;
var used_urls = {};

function submit_handler(e) {
	e.preventDefault();
	$('#used_url').hide();

	var input = $('#text_input').val();

	if (input in used_urls) {
		$('#text_input').val('');
		$('#used_url').show();
	} else {
		socket.emit('say', {msg: input});
		$('#text_input').attr('disabled', 'disabled');
		$('#text_input').val('WAIT FOR ' + miliseconds);

		used_urls[input] = true;
		
		setTimeout(function() {
			$('#text_input').val('');
			$('#text_input').removeAttr('disabled');
			$('#text_input').focus();
		}, miliseconds);
	}

}

$(document).ready(function() {
	
	$('form#chat').submit(submit_handler);

	$('#used_url').hide();
});
