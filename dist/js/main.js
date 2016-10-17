function edit_profil(){
	var element = $('#edit_profil').hasClass("none");
	if(element == true){
		$('#edit_profil').removeClass('none');
	}
	else {
	  	$('#edit_profil').addClass('none');
	}
}

$('#name, .title_edit').on('click', function (e){
	edit_profil()
});
