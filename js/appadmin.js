$( document ).ready(function() {
		
	var monArticle;
	


	$('#send').on('click', function() {
		monArticle = {"titre": $("#inputTitreArticle").val(), "contenu": $("#contenuArticle").val(), "date": datePublication() };
		requeteAjaxSet();
		$("#contenuArticle").val("");
		$("#inputTitreArticle").val("");
		
	});


	


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




});
