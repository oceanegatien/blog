$( document ).ready(function() {











	$.ajax({
	url:'http://192.168.1.50/json-db',
	data: {
		task: 'get',
		key: 'articleblogoceane'
	}
	}).done(function (data) {
	
	
	console.log(data);
	}).fail(function() {
		console.log('error');
	}).always(function() {
		console.log('complete');
	});






});