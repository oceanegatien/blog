$( document ).ready(function() {
	var monArticle;
	var blog = {};
	RecupereDonneesAjaxGet();
	afficherData();




	//-- Ajout

	$("#send").on('click', function() {
		monArticle = {"titre": $("#titre").val(), "contenu": $("#textInput").val(), "date": datePublication() };
		requeteAjaxSet();
		$("#textInput").val("");
		$("#titre").val("");
		$('#preview').html("");
	});




	//-- Markdown

	$('#textInput').on('keyup', function() {
		var content = markdown.toHTML($('#textInput').val());
			$('#preview').html(content);
	});
      

	//-- bouton supprimer pour supp un article
	$('body footer').delegate('.trashBtn', 'click', function() {
		var id = $(this).data("id");
		console.log(id);

		$.ajax({
			url:'http://192.168.1.50/json-db',
			data: {
				task: 'delete',
				key: 'articleblogoceane',
				_id: id
			}
		}).done(console.log('gg'));
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
			alert('server error');
		}).always(function() {
			console.log('complete');
		});
	}



	function afficherData() {
			if ( blog.length == 0|| blog == null || blog == undefined) {
				alert("blog vide");
			}else{
				for (var i = 0; i < blog.length; i++) {
					$("#listeTitreArticles").append('<h4 class="selecTitre" id="id'+i+'" value="'+i+'">\
						<a class="list-group-item text-center">'+blog[i].titre+'	\
						<button class="glyphicon glyphicon-trash btn-danger trashBtn" data-id="'+blog[i]._id+'"></button>\
						<button class="glyphicon glyphicon-pencil btn-warning"></button></h4></a>');
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


	// function del() {
	// 	$.ajax({
	// 		url:'http://192.168.1.50/json-db',
	// 		data: {
	// 			task: 'delete',
	// 			key: 'articleblogoceane',
	// 			_id: "idArticle"
	// 		}
	// 	}).done(console.log('gg'));
	// }


	
});


