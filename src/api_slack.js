var users = {};
function api_slack() {
        console.log('Api slack starting...');
        /*Token access*/
        let token = '';

        /*Récupération des groupes privé dans slack*/
        $.ajax({
            url: "https://slack.com/api/groups.list?token="+token+"&pretty=1",
            jsonp: "callback",
            dataType: "json",
            success: function( response ) {
               /* Récupération des informations du channel DEV1 uniquement*/
                let members = response.groups[0].members;
                /*Boucle pour récupérer tous les users de dev1*/
                 for(let j=0; j<members.length; j++){
                    /*Requete pour récuperer les informations des utilisateurs récupérer auparavant*/
                    $.ajax({
                        url: "https://slack.com/api/users.info?token="+token+"&user="+members[j]+"&pretty=1",
                        jsonp: "callback",
                        dataType: "json",
                        success: function( response ) {
                                users = {users_profile:response.user.profile.image_192, users_real_name:response.user.profile.real_name, users_email:response.user.profile.email};
                                console.log(users);
                        }
                    });
                }
            }
        });
}

export{users, api_slack};