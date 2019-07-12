import React, { useState } from 'react';
import { AppContext, Page } from '../App';
import { Instance } from '../internal/Client';

enum ErrorType {
	NONE,
	INVALID_DETAILS,
	SERVER_ERROR
};

export default function Login() {
	let [ email, setEmail ] = useState('');
	let [ password, setPassword ] = useState('');
	let [ error, setError ] = useState({ type: ErrorType.NONE, reason: '' });

	function attemptLogin(setPage: (page: Page) => void) {
		Instance.client.login(email, password).then((tfa) => {
			if (tfa) {
				// ? DO 2FA

				return;
			}

			localStorage.setItem('accessToken', Instance.client.accessToken as string);
			setPage(Page.LOAD);
		}).catch(err => {
			setError({
				type: (''+err).includes('403') ? ErrorType.INVALID_DETAILS : ErrorType.SERVER_ERROR,
				reason: ''+err
			});
		});
	}

	return (
		<AppContext.Consumer>
			{ app => 
				<div>
					{ error.type !== ErrorType.NONE && <p>{error.reason}</p> }
					<input value={email} onChange={e => setEmail(e.target.value)}></input>
					<input value={password} onChange={e => setPassword(e.target.value)}></input>
					<p onClick={() => attemptLogin(app.setPage)}>submit</p>
				</div>
			}
		</AppContext.Consumer>
	);
}