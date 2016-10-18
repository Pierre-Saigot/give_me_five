import * as slack from './api_slack';
import {Etudiant} from './etudiants_class';

	function init() {

			slack.api_slack(function(users){

				let e = [];
				// Les étudiants
					for(let j=0; j<users.length; j++){
						let p = users[j];
						e.push(new Etudiant(p.id, p.user_profile,p.user_first_name, p.user_second_name, p.user_email))
					}

				let $list_card = $('.etudiants_list'),
					$card 	= $list_card.children('#etd').detach();

				$('#number_etudiants').text(e.length);

				for(let j=0; j<e.length; j++){
					/*Score maximum que l'on peut atteindre*/
				let score_max = 100,
					/*Score de l'étudiant actuellement*/
					score_actuel = e[j].score,
					/*calcul du pourcentage pour la progress_bar*/
					pourcentage = (100*score_actuel/score_max);

				/*Récupération des informations traiter par l'api plus intégration dans des variables*/
				let user_name_complet = e[j].user_first_name +" "+ e[j].user_second_name,
					user_pp  		  = e[j].user_profile;

					/*Duplication d'une card plus ajout des informations unique à chaque étudiant*/
				let div 		= $card.clone();
					div.find('#name').text(user_name_complet);
					div.find('#email').text(e[j].user_email);
					div.find('#pp').attr('src', user_pp).attr('alt', user_name_complet)
					div.find('#progress_text').text('' + score_actuel +' pts');
					div.find('#progress_bar').css('width', ''+pourcentage+'%');
					/*Ajout de la card unifiée dans son espace dédié*/
					$list_card.append(div);
				}
		});
	}
export {init}