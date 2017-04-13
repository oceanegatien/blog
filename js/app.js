$( document ).ready(function() {
	

		

	$('#send').on('click', function() {
		var monArticle = saveValueInput();
		requeteAjax(monArticle);

	});


function saveValueInput() {
	var titre = $('main #inputTitreArticle').val();
	var contenuArticle = $('main #contenuArticle').val();

	var monArticle = {"titre": titre, "contenu": contenuArticle};
	console.log(monArticle.titre);
	return monArticle;
}





function requeteAjax(monArticle) {
    	console.log(monArticle);
	
	$.ajax({
       url : 'http://192.168.1.50/json-db',
       data : {task : 'set',
       			key: 'articleblogoceane',
       			value: monArticle }
    });

}










});
