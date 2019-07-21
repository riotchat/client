import React, { useState, useContext } from 'react';
import Helmet from 'react-helmet';
import { AppContext, Page } from '../App';

import { ErrorObject, APIError } from 'riotchat.js';

import logo from '../assets/downloads/branding/logo-white-full.svg';
import styles from './Login.module.scss';
import Notification from '../components/ui/components/Notification';
import { useAnimator, Animation } from '../scss/animations';
import { Input, Checkbox, NumberGroup } from '../components/ui/elements/Input';
import { Button } from '../components/ui/elements/Button';
import { Instance } from '../internal/Client';

enum LoginState {
	Login,
	TFA,
	Register,
	ResetPassword,
	Disabled
};

export default function Login() {
	let [ error, setError ] = useState<ErrorObject>({ error: APIError.NO_CLIENT_ERROR, reason: '' });
	let [ state, setState ] = useState(LoginState.Login);

	let [ email, setEmail ] = useState('');
	let [ username, setUsername ] = useState('');
	let [ password, setPassword ] = useState('');
	let [ acceptTOS, setTOS ] = useState('');
	let [ disableButton, setDisabled ] = useState(false);

	let [ animation, playAnimation ] = useAnimator(Animation.BOUNCE_IN, 250);

	function submitForm(e: React.FormEvent, setPage: (page: Page) => void) {
		e.preventDefault();
		setDisabled(true);
		
		Instance.client.login(email, password).then((tfa) => {
			if (tfa) {
				return;
			}

			localStorage.setItem('accessToken', Instance.client.accessToken as string);
			setPage(Page.LOAD);
		}).catch((err: ErrorObject) => {
			setDisabled(false);
			setError(err)
		});
	}

	function toggle(target: LoginState, e?: React.MouseEvent) {
		e && e.preventDefault();
		playAnimation(Animation.SCALE_OUT, 200)
			.then(() => {
				playAnimation(Animation.BOUNCE_IN, 200);
				setState(target)	
			});
	}

	let form;
	switch (state) {
		case LoginState.Login:
			form = <div>
					<div className={styles.welcome}>Welcome back!</div>

					<span className={styles.title}>E-Mail
						{ error.error === APIError.INVALID_EMAIL && <span className={styles.error}> - {error.reason}</span> }
					</span>
					<Input type="email" aria-label="E-Mail" value={email} onChange={e => setEmail(e.target.value)} />
					<span className={styles.title}>Password
						{ error.error === APIError.INVALID_PASSWORD && <span className={styles.error}> - {error.reason}</span> }
					</span>
					<Input type="password" aria-label="Password" value={password} onChange={e => setPassword(e.target.value)} />
					<a className={styles.link} href="/forgot" onClick={e => toggle(LoginState.ResetPassword, e)}>Forgot your password?</a>
					<Button theme="confirm" type="submit" value={ disableButton ? 'Logging you in...' : 'Log in' } fullwidth={true} disabled={disableButton} />

					<span className={styles.signin}>Need an account? <a href="/register" className={styles.link} onClick={e => toggle(LoginState.Register, e)}>Sign up</a></span>
				</div>;
			break;
		case LoginState.Register:
			form = <div>
					<div className={styles.welcome}>Create an account</div>
					<span className={styles.title}>E-Mail</span>
					<Input type="email" aria-label="E-Mail" name="email" value={email} required onChange={e => setEmail(e.target.value)} />
					<span className={styles.title}>Username</span>
					<Input type="text" aria-label="Username" autoComplete="username" value={username} required onChange={e => setUsername(e.target.value)} />
					<span className={styles.title}>Password</span>
					<Input type="password" aria-label="Password" value={password} required onChange={e => setPassword(e.target.value)} />
					<Checkbox required value={acceptTOS} onChange={e => setTOS(e.target.value)}>
						I agree to Riot's <a href="/somewhere/idk" target="_blank" className={styles.link}>Terms of Service</a> and <a href="/test" className={styles.link}>Community Guidelines</a>
					</Checkbox>
					<Button theme="confirm" type="submit" value="Sign up" fullwidth={true} disabled={disableButton} />

					<span className={styles.signin}>Have an account? <a href="/login" className={styles.link} onClick={e => toggle(LoginState.Login, e)}>Sign in</a></span>
				</div>;
			break;
		case LoginState.TFA:
			form = <div>
					<div className={styles.welcome}>Two-Factor Authentication</div>
					<NumberGroup aria-label="Verification Code" digits={6} separator={3} />
					<a href="/login" className={styles.link} onClick={e => toggle(LoginState.Login, e)}>Resend Code</a>
					<Button theme="confirm" type="submit" value="Log in" fullwidth={true} disabled={disableButton} />
					<Button theme="cancel" type="submit" value="Cancel" onClick={e => toggle(LoginState.Login, e)} fullwidth={true} />
				</div>;
			break;
		case LoginState.ResetPassword:
			form = <div>
					<div className={styles.welcome}>Forgot your password?</div>
					<div className={styles.text}>No worries, just enter your e-mail and we'll send you instructions to reset your password.</div>
					<span className={styles.title}>Email</span>
					<Input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
					<Button theme="confirm" type="submit" value="Send E-Mail" fullwidth={true} disabled={disableButton} />
					<span className={styles.signin}>Remembered your password? <a href="/register" className={styles.link} onClick={e => toggle(LoginState.Login, e)}>Log in</a></span>
				</div>;
			break;
		case LoginState.Disabled:
			form = <div>
					<div className={styles.welcome}>Account Disabled</div>
					<div className={styles.text}>Your account has been disabled due to violating our Terms of Service or Community Guidelines</div>
					<div className={styles.text}>Check your e-mail for more information.</div>
					<a href="/register" className={styles.link} onClick={e => toggle(LoginState.Login, e)}>Back to login</a>
				</div>;
			break;
	}

	let app = useContext(AppContext);
	return (
		<div className={styles.wrapper}>
			<Helmet>
				<meta name="theme-color" content="#7B68EE"/>
			</Helmet>
			{ error.error === APIError.CONNECTION_FAILED &&
				<Notification title='Failed to login'
					text={error.reason} />
			}
			<div className={styles.overlay} />
			<div className={styles.login}>
				<div className={styles.left}>
					<img alt="Riot" className={styles.logo} src={logo} draggable={false}/>
				</div>
				<div className={styles.right} style={animation.styles}>
					<form className={styles.form} onSubmit={ev => submitForm(ev, app.setPage)}>
						{ form }
					</form>
				</div>
			</div>
		</div>
	);
}