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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _give_me_five = __webpack_require__(1);

	var _give_me_five2 = _interopRequireDefault(_give_me_five);

	var _etudiants_tools = __webpack_require__(21);

	var _etudiants_tools2 = _interopRequireDefault(_etudiants_tools);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _give_me_five2.default)(); // Start application
	console.log('Give Me Five V0.1 was started');
	(0, _etudiants_tools2.default)(); // Clone des cards plus traitement des données

/***/ },

/***/ 1:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
			value: true
	});

	exports.default = function () {
			console.log('Start Give Me Five...');
	};

/***/ },

/***/ 2:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var users = {};
	function api_slack() {
	    console.log('Api slack starting...');
	    /*Token access*/
	    var token = 'xoxp-86302774640-86634928720-92791110017-b3828759df774ef7d0b71868adcdea1e';

	    /*Récupération des groupes privé dans slack*/
	    $.ajax({
	        url: "https://slack.com/api/groups.list?token=" + token + "&pretty=1",
	        jsonp: "callback",
	        dataType: "json",
	        success: function success(response) {
	            /* Récupération des informations du channel DEV1 uniquement*/
	            var members = response.groups[0].members;
	            /*Boucle pour récupérer tous les users de dev1*/
	            for (var j = 0; j < members.length; j++) {
	                /*Requete pour récuperer les informations des utilisateurs récupérer auparavant*/
	                $.ajax({
	                    url: "https://slack.com/api/users.info?token=" + token + "&user=" + members[j] + "&pretty=1",
	                    jsonp: "callback",
	                    dataType: "json",
	                    success: function success(response) {
	                        exports.users = users = { users_profile: response.user.profile.image_192, users_real_name: response.user.profile.real_name, users_email: response.user.profile.email };
	                        console.log(users);
	                    }
	                });
	            }
	        }
	    });
	}

	exports.users = users;
	exports.api_slack = api_slack;

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
			value: true
	});

	exports.default = function () {
			slack.api_slack();
			console.log(slack.users);
	};

	var _api_slack = __webpack_require__(2);

	var slack = _interopRequireWildcard(_api_slack);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }

/******/ });