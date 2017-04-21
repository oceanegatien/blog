$( document ).ready(function() {
	$(".dropdown-button").dropdown();
	var blog = {};
	RecupereDonneesArticles();
	var monCommentaire = {};
	var commentaireListe={};
	ajaxGetDonneesCommentaires();


	$('#sendCommentaire').on('click', function() {
		requeteSetCommentaires();
		$('#pseudo').val("");
		$('#commentaire').val("");
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



	function RecupereDonneesArticles() {
	
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
			blog = JSON.parse(data);
			afficherArticles();
		}).fail(function(e) {
			alert('server error');
			console.log(e);
		}).always(function(e) {
			console.log('complete');
		});
	}

	function afficherArticles() {
			if ( blog.length == 0|| blog == null || blog == undefined) {
				alert("blog vide");
			}else{
				$('#afficherContenu').append('<h4>'+blog[0].titre+'</h4>');
				$('#afficherContenu').append('<p>'+blog[0].contenu+'</p>');
				$('#afficherContenu').append('<div>'+blog[0].date+'</div>');
				console.log(blog);
				for (var i = 0; i < blog.length; i++) {
					//console.log( blog[i] );
					$("#listeTitreArticles").append('<li class="collection-item"><div class="selecTitre" value="'+i+'">'+blog[i].titre+'<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>');
				}

				$('.selecTitre').click(function () {
					$('#afficherContenu').html("");
					var a = $(this).attr('value');
					var articleEnCours = blog[a];
					$('#afficherContenu').append('<h4>'+articleEnCours.titre+'</h4>');
					$('#afficherContenu').append('<p>'+articleEnCours.contenu+'</p>');
					$('#afficherContenu').append('<div>'+articleEnCours.date+'</div>');
					
				});
			}
	}







	function datePublication() {
	
		var maintenant=new Date();
		var jour = maintenant.getDate();
		var mois = maintenant.getMonth()+1;
		var an = maintenant.getFullYear();
		return jour+"."+mois+"."+an;
	}

	function requeteSetCommentaires() {
    	monCommentaire = {"pseudo": $('#pseudo').val(), "commentaire": $('#commentaire').val(), "date": datePublication()}
    	console.log( monCommentaire );
	
		$.ajax({
      		url : "http://192.168.1.50/json-db",
       		data : {
       			task : "set",
       			key: "commentairesblogoceane",
       			value: JSON.stringify(monCommentaire)
       		}
    	}).done(function(retour){
    		ajaxGetDonneesCommentaires();
    		if (retour === "ko") {
    			alert("Désolé, problème de serveur! Réessayer");
    		}
    	});		

	}


	function ajaxGetDonneesCommentaires() {
	
		$.ajax({
			url:'http://192.168.1.50/json-db',
			data: {
			task: 'get',
			key: 'commentairesblogoceane'
			}
		}).done(function (datacommentaires) {
			commentaireListe = JSON.parse(datacommentaires);
			afficherDataCommentaires();
		}).fail(function() {
			alert('loading error');
		});
	}



	function afficherDataCommentaires() {
		$('#afficherCommentaires').html("");
		
		for (var i = 0; i < commentaireListe.length; i++) {
			$('#afficherCommentaires').append('<blockquote>'+commentaireListe[i].commentaire+'<br><small>'+commentaireListe[i].pseudo+" - "+commentaireListe[i].date+'</small></blockquote>');
		}
	}
});


