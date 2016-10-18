/*
*** Création du tableau qui va contenir toute les informations récupérer par l'api slack
*** Création de la variable score pour ajouter dans le tableau users
*/
let profiles = {},
    users = [];

/*Création de la fonction*/
function api_slack(callback) {
        console.log('Api slack starting...');
        /*Token access*/
        let token = '';
         /*Récupération des groupes privé dans slack*/
        $.ajax( 
                "https://slack.com/api/groups.list?token="+token+"&pretty=1" 
        ).done(function( response ) {

            /* Récupération des informations du channel DEV1 uniquement*/
                let members = response.groups[0].members,
                    requests = [];
                /*Boucle pour récupérer tous les users de dev1*/
                 for(let j=0; j<members.length; j++){
                    /*Requete pour récuperer les informations des utilisateurs récupérer auparavant*/
                    requests.push( $.ajax( 
                            "https://slack.com/api/users.info?token="+token+"&user="+members[j]+"&pretty=1" 
                        ).done(function(response){
                            let slackProfil = response.user.profile
                             /*Ajout des données récupérer par l'api dans le tableau*/
                            if (!response.user.is_admin){
                                profiles = {id: response.user.id, user_profile:slackProfil.image_192, user_first_name:slackProfil.first_name, user_second_name:slackProfil.last_name, user_email:slackProfil.email};
                                users.push(profiles);
                            }
                        }))
                }

                $.when.apply($,requests).then(function(){
                /*Affichage dans la console quand les requetes sont finis*/
                console.log('All data is loaded...')
                    if(callback){
                        callback(users)
                    }
                })

        });
}
/*Export des données récupérer dans cette page grace à l'api*/
export {users, api_slack}