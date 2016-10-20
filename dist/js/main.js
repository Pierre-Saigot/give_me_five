$( document ).ready(function() {
	let height = $( document ).height();
	$('#loader').css('height', height);
});

	function loader(){
			$('#loader').addClass('none');
	}
