class Etudiant{

	constructor(id, user_profile, user_first_name, user_second_name, user_email){

		this.id 				= id;
		this.user_profile 		= user_profile;
		this.user_first_name 	= user_first_name;
		this.user_second_name 	= user_second_name;
		this.user_email			= user_email;
		this.score 				= 0;
	}
}

export {Etudiant}