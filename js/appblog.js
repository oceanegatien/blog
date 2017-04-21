$( document ).ready(function() {
	$(".dropdown-button").dropdown();
	var blog = {};
	RecupereDonneesAjax();
	afficherData();



	





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
					$("#listeTitreArticles").append('<li class="collection-item"><div class="selecTitre" value="'+i+'">'+blog[i].titre+'<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>');
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

			if(data=='ko'){
				alert('Désolé, ca chie');
				return;
			}
			console.log(data);
			blog = JSON.parse(data);
			afficherData();
		}).fail(function(e) {
			alert('server error');
			console.log(e);
		}).always(function(e) {
			console.log('complete');
		});
	}






});


