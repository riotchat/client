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
	Instance.loggedIn = false;
	Instance.client.close();
	delete Instance.client;
	Instance = CreateInstance();
}

export function LogoutClient() {
	ResetClient();
	localStorage.removeItem('accessToken');
}