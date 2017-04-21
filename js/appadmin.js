	var monArticle;
	var blog = {};
	var id;
	commentaireListe = {};
	RecupereDonneesAjaxGet();
	ajaxGetCommentaires();
	



	//-- Ajout

	$("main div #send").click(function() {
		monArticle = {"titre": $("#titre").val(), "contenu": $("#textInput").val(), "date": datePublication() };
		$("#textInput").val("");
		$("#titre").val("");
		$('#preview').html("");
		requeteAjaxSet();
	});




	//-- Markdown

	$('#textInput').on('keyup', function() {
		var content = markdown.toHTML($('#textInput').val());
			$('#preview').html(content);
	});
      

	//-- bouton supprimer pour supp un article
	$('body main div').delegate('.trashBtn', 'click', function() {
		id = $(this).data("id");
		deleteAjaxArticles();
		RecupereDonneesAjaxGet();

	});

	//--bouton pour supprimer un commentaire
	$('body footer ul').delegate('.trashBtn', 'click', function() {
		id = $(this).data("id");
		deleteAjaxCommentaires();
		ajaxGetCommentaires();

	});

	//--bouton modifié article
	$('body main').delegate('.modifBtn', 'click', function() {
		var content =  $('#afficherContenu').val();
		var id = $(this).data("id");
		var titre;
		var date;
		for (var i = 0; i < blog.length; i++) {
			if(id === blog[i]._id){
				titre = blog[i].titre;
				date = blog[i].date;
			}
		}

		monArticle = {"titre": titre , "contenu":content , "date": date, "_id": id};

		$.ajax({
			url:'http://192.168.1.50/json-db',
			data: {
				task: 'update',
				key: 'articleblogoceane',
				_id: id,
				value: JSON.stringify(monArticle),
			}
		}).done(function(retour) {
			window.location.reload()
			if (retour === "ko") {
    			alert("Désolé, problème de serveur! Réessayer");
    		}
		});
	});



//fonction pour afficher contenu article lors du clic sur un titre
	$('#listeTitreArticles').delegate('.selecTitre','click', function () {
		$('#afficherContenu').html("");
		var a = $(this).attr('value');
		var articleEnCours = blog[a];
		$('#afficherContenu').append(articleEnCours.contenu);		
	});




//-- fonctions appelées

	function requeteAjaxSet() {
    
    	console.log( monArticle );
	
		$.ajax({
      		url : "http://192.168.1.50/json-db",
       		data : {
       			task : "set",
       			key: "articleblogoceane",
       			value: JSON.stringify(monArticle)
       		}
    	}).done(function(retour){
    		RecupereDonneesAjaxGet();
    		console.log(retour);
    		if (retour === "ko") {
    			alert("Désolé, problème de serveur! Réessayer");
    		}
    	});		

	}




	function datePublication() {
	
		var maintenant=new Date();
		var jour = maintenant.getDate();
		var mois = maintenant.getMonth()+1;
		var an = maintenant.getFullYear();
		return jour+"."+mois+"."+an;
	}




	function RecupereDonneesAjaxGet() {
	
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
			alert('loading error');
		});
	}



	function afficherData() {
		$('#listeTitreArticles').html("");
		for (var i = 0; i < blog.length; i++) {
			$("#listeTitreArticles").append('<a class="collection-item selecTitre" data-id="'+blog[i]._id+'" value="'+i+'"> '+blog[i].titre+' // '+blog[i].date+' <a class="btn-floating orange"><i class="material-icons modifBtn" data-id="'+blog[i]._id+'">mode_edit</i></a> Editer <a class="btn-floating red"><i class="material-icons trashBtn" data-id="'+blog[i]._id+'">delete</i></a></a>Supprimer');
		}
	}


	function deleteAjaxArticles() {
		$.ajax({
				url:'http://192.168.1.50/json-db',
				data: {
					task: 'delete',
					key: 'articleblogoceane',
					_id: id,
				}
		}).done(function(retour) {
			if (retour === "ko") {
    			alert("Désolé, problème de serveur! Réessayer");
    		}
		});
	}


	function deleteAjaxCommentaires() {
		$.ajax({
				url:'http://192.168.1.50/json-db',
				data: {
					task: 'delete',
					key: 'commentairesblogoceane',
					_id: id,
				}
		}).done(function(retour) {
			if (retour === "ko") {
    			alert("Désolé, problème de serveur! Réessayer");
    		}
		});
	}


	function ajaxGetCommentaires() {
	
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
		$('#listeCommentaires').html("");
		console.log(commentaireListe);
		for (var i = 0; i < commentaireListe.length; i++) {
			$('#listeCommentaires').append('<li class="collection-item avatar"><span class="title">'+commentaireListe[i].commentaire+'</span><small><p>'+commentaireListe[i].pseudo+'<br>'+commentaireListe[i].date+'</p><a href="#!" class="secondary-content"><i data-id="'+commentaireListe[i]._id+'" class="material-icons trashBtn">delete</i></small></a></li>');
		}
	}
