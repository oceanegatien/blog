$( document ).ready(function() {
	var blog = {};
	RecupereDonneesAjax();
	afficherData();



	$('#erase').click(function() {
		del();
	});





	function del() {
	
		$.ajax({
			url:'http://192.168.1.50/json-db',
			data: {
				task: 'delete',
				key: 'articleblogoceane'
			}
		}).done();
	}




	function afficherData() {
			if ( blog.length == 0|| blog == null || blog == undefined) {
				alert("blog vide");
			}else{
				for (var i = 0; i < blog.length; i++) {
					console.log( blog[i] );
					$("#listeTitreArticles").append('<h4 class="selecTitre" value="'+i+'"><a class="list-group-item text-center">'+blog[i].titre+'</h4></a>');
				}

				$('.selecTitre').click(function () {
					$('#afficherContenu').html("");
					var a = $(this).attr('value');
					console.log(blog[a]);
					var articleEnCours = blog[a];
					console.log(articleEnCours);
					$('#afficherContenu').append('<h4>'+articleEnCours.titre+'</h4>');
					$('#afficherContenu').append('<p>'+articleEnCours.contenu+'</p>');
					$('#afficherContenu').append('<div>'+articleEnCours.date+'</div>');
		
				});
			}
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
			afficherData();
		}).fail(function() {
			alert('server error');
		}).always(function() {
			console.log('complete');
		});
	}






});


