console.log('%c Give Me Five start...', 'color: #0277BD');

	import * as etudiants_tools from './etudiants_tools';// Importation du fichier etudiants_tools traitement + affichage des étudiants
	import * as gestion_date from './gestion_date';

	/*Initialisation d'étudiants tools*/
	etudiants_tools.init();
	gestion_date.init();

	$(document).ready(function(){
	  $('.modal-trigger').leanModal({
	      dismissible: true, // Modal can be dismissed by clicking outside of the modal
	      opacity: .5, // Opacity of modal background
	      in_duration: 300, // Transition in duration
	      out_duration: 200, // Transition out duration
	      starting_top: '14%', // Starting top style attribute
	      complete: function() {} // Callback for Modal close
	    })
	})
  	$('.modal-footer a').on( "click", function() {
  		let id = $(this).attr('id');
  		if(id == 'yes'){
			localStorage.removeItem('saved');
			location.reload();
  		}
  	})



console.log('%c Give Me Five V0.1 was started !', 'color: #0277BD');
