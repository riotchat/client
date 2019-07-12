import { Client } from 'riotchat.js';

function CreateInstance() {
	return {
		client: new Client(),
		loggedIn: false
	};
}

export var Instance: {
	client: Client
	loggedIn: boolean
} = CreateInstance();

export function ResetClient() {
	// ! REPLACE WITH CLOSE LATER
	let c = Instance.client as any;
	if (c.ws) c.ws.close();
	clearInterval(c.pingPong);

	delete Instance.client;
	Instance = CreateInstance();
}