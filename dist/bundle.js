/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _give_me_five = __webpack_require__(1);

	var _give_me_five2 = _interopRequireDefault(_give_me_five);

	var _etudiants_tools = __webpack_require__(2);

	var etudiants_tools = _interopRequireWildcard(_etudiants_tools);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _give_me_five2.default)(); // Start application
	console.log('Give Me Five V0.1 was started');
	etudiants_tools.init(); // Clone des cards plus traitement des données

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
			value: true
	});

	exports.default = function () {
			console.log('Start Give Me Five...');
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.init = undefined;

	var _api_slack = __webpack_require__(3);

	var slack = _interopRequireWildcard(_api_slack);

	var _etudiants_class = __webpack_require__(4);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function init() {

		slack.api_slack(function (users) {

			var e = [];
			// Les étudiants
			for (var j = 0; j < users.length; j++) {
				var p = users[j];
				e.push(new _etudiants_class.Etudiant(p.id, p.user_profile, p.user_first_name, p.user_second_name, p.user_email));
			}

			var $list_card = $('.etudiants_list'),
			    $card = $list_card.children('#etd').detach();

			for (var _j = 0; _j < e.length; _j++) {
				console.log(e[_j]);

				/*Score maximum que l'on peut atteindre*/
				var score_max = 100,

				/*Score de l'étudiant actuellement*/
				score_actuel = e[_j].score,

				/*calcul du pourcentage pour la progress_bar*/
				pourcentage = 100 * score_actuel / score_max;

				/*Récupération des informations traiter par l'api plus intégration dans des variables*/
				var user_name_complet = e[_j].user_first_name + " " + e[_j].user_second_name,
				    user_pp = e[_j].user_profile;

				/*Duplication d'une card plus ajout des informations unique à chaque étudiant*/
				var div = $card.clone();
				div.find('#name').text(user_name_complet);
				div.find('#pp').attr('src', user_pp).attr('alt', user_name_complet);
				div.find('#progress_text').text('' + score_actuel + ' pts');
				div.find('#progress_bar').css('width', '' + pourcentage + '%');
				/*Ajout de la card unifiée dans son espace dédié*/
				$list_card.append(div);
			}
		});
	}
	exports.init = init;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	*** Création du tableau qui va contenir toute les informations récupérer par l'api slack
	*** Création de la variable score pour ajouter dans le tableau users
	*/
	var profiles = {},
	    users = [];

	/*Création de la fonction*/
	function api_slack(callback) {
	    console.log('Api slack starting...');
	    /*Token access*/
	    var token = '';
	    /*Récupération des groupes privé dans slack*/
	    $.ajax("https://slack.com/api/groups.list?token=" + token + "&pretty=1").done(function (response) {

	        /* Récupération des informations du channel DEV1 uniquement*/
	        var members = response.groups[0].members,
	            requests = [];
	        /*Boucle pour récupérer tous les users de dev1*/
	        for (var j = 0; j < members.length; j++) {
	            /*Requete pour récuperer les informations des utilisateurs récupérer auparavant*/
	            requests.push($.ajax("https://slack.com/api/users.info?token=" + token + "&user=" + members[j] + "&pretty=1").done(function (response) {
	                var slackProfil = response.user.profile;
	                /*Ajout des données récupérer par l'api dans le tableau*/
	                if (!response.user.is_admin) {
	                    profiles = { id: response.user.id, user_profile: slackProfil.image_192, user_first_name: slackProfil.first_name, user_second_name: slackProfil.last_name, user_email: slackProfil.email };
	                    users.push(profiles);
	                }
	            }));
	        }

	        $.when.apply($, requests).then(function () {
	            /*Affichage dans la console quand les requetes sont finis*/
	            console.log('All data is loaded...');
	            if (callback) {
	                callback(users);
	            }
	        });
	    });
	}
	/*Export des données récupérer dans cette page grace à l'api*/
	exports.users = users;
	exports.api_slack = api_slack;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Etudiant = function Etudiant(id, user_profile, user_first_name, user_second_name, user_email) {
		_classCallCheck(this, Etudiant);

		this.id = id;
		this.user_profile = user_profile;
		this.user_first_name = user_first_name;
		this.user_second_name = user_second_name;
		this.user_email = user_email;
		this.score = 0;
	};

	exports.Etudiant = Etudiant;

/***/ }
/******/ ]);