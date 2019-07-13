import React, { useState } from 'react';
import { AppContext, Page } from '../App';
import { Instance } from '../internal/Client';

import logo from '../assets/downloads/branding/logo-white-full.svg';
import styles from './Login.module.scss';
import Notification from '../components/ui/Notification';

enum ErrorType {
	NONE,
	INVALID_EMAIL,
	INAVLID_PASSWORD,
	SERVER_ERROR
};

export default function Login() {
	let [ email, setEmail ] = useState('');
	let [ password, setPassword ] = useState('');
	let [ error, setError ] = useState({ type: ErrorType.NONE, reason: '' });

	function submitForm(e: React.FormEvent, setPage: (page: Page) => void) {
		e.preventDefault();
		Instance.client.login(email, password).then((tfa) => {
			if (tfa) {
				// ? DO 2FA

				return;
			}

			localStorage.setItem('accessToken', Instance.client.accessToken as string);
			setPage(Page.LOAD);
		}).catch(err => {
			setError({
				// ! BAD CODE FIX ASAP
				type: (''+err).includes('403') ? ErrorType.INVALID_EMAIL : ErrorType.SERVER_ERROR,
				reason: ''+err
			});
		});
	}

	return (
		<AppContext.Consumer>
			{ app => 
				<div>
					<div className={styles.login}>
						<div className={styles.overlay}>
							{ error.type !== 0 && <Notification title='Failed to login' text={error.reason} /> }
						</div>
						<div className={styles.left}>
							<img alt="Riot" className={styles.logo} src={logo} draggable={false}/>
						</div>
						<div className={styles.right}>
							<form className={styles.form} onSubmit={ev => submitForm(ev, app.setPage)}>
								<div className={styles.welcome}>Welcome back!</div>

								<span className={styles.title}>Email</span>
								<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
								<span className={styles.title}>Password</span>
								<input type="password" value={password} onChange={e => setPassword(e.target.value)} />

								<a className={styles.link} href="/forgotidk">Forgot your password?</a>
								<input type="submit" value="Log in"/>

								<span className={styles.signin}>Need an account? <a className={styles.link} href="x">Sign up</a></span>
							</form>
						</div>
					</div>
				</div>
			}
		</AppContext.Consumer>
	);
}