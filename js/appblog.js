$( document ).ready(function() {
	var blog = {};
	RecupereDonneesAjax();
	//console.log(data);
	affichageData();

	//del();

	function del() {
	
		$.ajax({
			url:'http://192.168.1.50/json-db',
			data: {
				task: 'delete',
				key: 'articleblogoceane'
			}
		});
	}





	function RecupereDonneesAjax() {
	
		$.ajax({
			url:'http://192.168.1.50/json-db',
			data: {
			task: 'get',
			key: 'articleblogoceane'
			}
		}).done(function (data) {
			blog = JSON.parse(data);
			console.log(data);
			console.log(blog);
			return blog;
		}).fail(function() {
			alert('error');
		}).always(function() {
			console.log('complete');
		});
	}


	function affichageData () {
		for (var i = 0; i < blog.length ; i++) {
			var obj = blog[i];
			console.log(obj.titre);
			$("#affichageArticle").append('<li class="list-group-item"><h1>'+obj.titre+'</h1></li>');
		}


	}


});