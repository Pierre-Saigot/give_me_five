import * as slack from './api_slack';
export default function() {
		slack.api_slack();
		console.log(slack.users);
}