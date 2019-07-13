import React, { useState } from 'react';
//import Helmet from 'react-helmet';
import { AppContext, Page } from '../App';
import { Instance } from '../internal/Client';

import logo from '../assets/downloads/branding/logo-white-full.svg';
import styles from './Login.module.scss';
import Notification from '../components/ui/elements/Notification';
import Modal from '../components/ui/components/Modal';
import { Button } from '../components/ui/components/Button';

enum ErrorType {
	NONE,
	INVALID_EMAIL,
	INAVLID_PASSWORD,
	SERVER_ERROR
};

export default function Login() {
	let [ doRegister, setRegister ] = useState(false);
	let [ error, setError ] = useState({ type: ErrorType.NONE, reason: '' });

	// Form Inputs
	let [ email, setEmail ] = useState('');
	let [ password, setPassword ] = useState('');

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

	function toggle(e: React.MouseEvent, target: boolean) {
		e.preventDefault();
		setRegister(target);
	}

	let [ tfa, setTFA ] = useState(true);

	return (
		<AppContext.Consumer>
			{ app => 
				<div>
					<div className={styles.login}>
						{ tfa &&
							<Modal title='2FA required'
								allowClose={true}
								dismiss={() => setTFA(false)}
								buttons={[
									{ type: 'confirm', value: 'Continue' },
									{ value: 'Cancel', close: true }
								]}>
								This is where the fancy input will be yes
							</Modal>
						}

						<div className={styles.overlay}>
							{ error.type !== 0 && <Notification title='Failed to login' text={error.reason} /> }
						</div>
						<div className={styles.left}>
							<img alt="Riot" className={styles.logo} src={logo} draggable={false}/>
						</div>
						<div className={styles.right}>
							<form className={styles.form} onSubmit={ev => submitForm(ev, app.setPage)}>
								{ doRegister ?
									<div>
										<div className={styles.welcome}>Create an account</div>
										<span className={styles.title}>Email</span>
										<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
										<span className={styles.title}>Desired Username</span>
										<input type="text" value={email} onChange={e => setEmail(e.target.value)} />
										<span className={styles.title}>Password</span>
										<input type="password" value={password} onChange={e => setPassword(e.target.value)} />

										<input type="checkbox" value='true'/>
										<span className={styles.description}>I agree to Riot's Terms of Service and its Community Guidelines.</span>
										<input type="submit" value="Sign up"/>

										<span className={styles.signin}>Have an account? <a href="/login" className={styles.link} onClick={e => toggle(e, false)}>Sign in</a></span>
									</div>
								  : <div>
										<div className={styles.welcome}>Welcome back!</div>

										<span className={styles.title}>Email</span>
										<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
										<span className={styles.title}>Password</span>
										<input type="password" value={password} onChange={e => setPassword(e.target.value)} />

										<a className={styles.link} href="/forgotidk">Forgot your password?</a>
										<input type="submit" value="Log in"/>

										<span className={styles.signin}>Need an account? <a href="/register" className={styles.link} onClick={e => toggle(e, true)}>Sign up</a></span>
									</div>
								}
							</form>
						</div>
					</div>
				</div>
			}
		</AppContext.Consumer>
	);
}