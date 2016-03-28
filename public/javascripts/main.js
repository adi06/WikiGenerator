$(function() {
	var $data = $('#users');
	$.ajax({
		type : 'GET',
		url : '/api/users',
		success : function(data){
			$.each(data, function(i, data) {
				$data.append('<li>name:'+data.name+',password:'+data.password+'</li>');
			});
		}
	});
});