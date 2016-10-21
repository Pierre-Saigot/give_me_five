function init() {
	moment.locale('fr');
	let day = moment().format("dddd D MMMM");;
	$('#today').text(day +".");
}

export{init}