/*Importation des informations récupérer avec l'api slack*/
import * as slack from './api_slack';
/*Importation de la class Etudiant*/
import {Etudiant} from './etudiants_class';

	let e 		= [],
		stock 	= {},
		stock_score = [];
	function init(my_users) {

			let ok = [],
				score_actuel = 0,
				/*Score maximum que l'on peut atteindre*/
				score_max = 100,
				/*calcul du pourcentage pour la progress_bar*/
				pourcentage = (100*score_actuel/score_max);

			slack.api_slack(function(users){
				var saved = JSON.parse(localStorage.getItem("saved"));
				if(saved == null){
					// Les étudiants
					for(let j=0; j<users.length; j++){
						let p = users[j];
						e.push(new Etudiant(p.id, p.user_profile,p.user_first_name, p.user_second_name, p.user_email, p.color));
					}
				}else{
					e = saved;
				}



				let $list_card = $('.etudiants_list'),
					$card 	= $list_card.children('#etd').detach();

				$('#number_etudiants').text(e.length);


				for(let j=0; j<e.length; j++){
					
					/*Score de l'étudiant actuellement*/
					score_actuel = e[j].score;
				

				/*Récupération des informations traiter par l'api plus intégration dans des variables*/
				let user_name_complet = e[j].user_first_name +" "+ e[j].user_second_name,
					user_pp  		  = e[j].user_profile;


				/*Duplication d'une card plus ajout des informations unique à chaque étudiant*/
				let div 		= $card.clone();
					div.find('#name').text(user_name_complet);
					div.attr('id_user', j);
					div.find('#email').text(e[j].user_email);
					div.find('#pp').attr('src', user_pp).attr('alt', user_name_complet)
					div.find('#progress_text').text('' + score_actuel +' pts');
					div.find('#progress_bar').css('width', ''+pourcentage+'%');

					/*Ajout de la card unifiée dans son espace dédié*/
					$list_card.append(div);

					let present = 0,
						retard 	= 0,
						absent 	= 0;

					$(div.find('li')).on( "click", function() {


						/*Gestion des clicks en mode "radio" + récupération du type d'event*/
						let id = $(this).attr('id'),
							id_user = div.attr('id_user');

							$(div.find('li')).removeClass('selected');
							$(this).addClass('selected');

						/*Mise à jour graphique des données */
						function update_visuel(){
							div.find('#progress_text').text('' + score_actuel +' pts');
							/*mise à jour de cette variable*/
							pourcentage = (100*score_actuel/score_max);
							div.find('#progress_bar').css('width', ''+pourcentage+'%');
						}


						/*Si on click sur present*/
						if(id == "present"){
							if(present == 0){
								if(retard == 1){
									score_actuel = e[j].score += 12;
								}
								else if (absent == 1){
									score_actuel = e[j].score += 20;
								}
								else{
									score_actuel = e[j].score += 10;
								}
								update_visuel();
								present = 1;
								retard = 0;
								absent = 0;
							}
						}

						/*Si on click sur retard*/
						else if(id == "retard"){
							if(retard == 0){
								if(present == 1){
									score_actuel = e[j].score -= 12;
								}
								else if (absent == 1){
									score_actuel = e[j].score += 8;
								}
								else{
									score_actuel = e[j].score -= 2;
								}
								update_visuel();
								present = 0;
								retard = 1;
								absent = 0;
							}
						}

						/*Si on click sur absent*/
						else if(id == "absent"){
							if(absent == 0){
								if(present == 1){
									score_actuel = e[j].score -= 20;
								}
								else if (retard == 1){
									score_actuel = e[j].score -= 8;
								}
								else{
									score_actuel = e[j].score -= 10;
								}
								update_visuel();
								present = 0;
								retard = 0;
								absent = 1;
							}
						}
						localStorage.setItem('saved', JSON.stringify(e));

					});

			}
			$.when.apply($,ok).then(function(){
                if(my_users){
                    my_users(e)
                }
            })
		});
	}
/*Exportation de l'initation des cards étudiants pour le start dans le fichier app.js*/
export {init, e}