console.log('%c Give Me Five start...', 'color: #0277BD');

	import * as etudiants_tools from './etudiants_tools';// Importation du fichier etudiants_tools traitement + affichage des étudiants
	
	/*Initialisation d'étudiants tools*/
	etudiants_tools.init(function(users){
		/*Envoie des étudiants récupérer dans l'initiation dans la fonction getUsers*/
		etudiants_tools.updateScore(users, 5, 1999);
	})


console.log('%c Give Me Five V0.1 was started !', 'color: #0277BD');
