import React, { useState, useContext } from 'react';
import { AppContext, Page } from '../App';
import { Instance } from '../internal/Client';

import logo from '../assets/downloads/branding/logo-white-full.svg';
import styles from './Login.module.scss';
import Notification from '../components/ui/components/Notification';
import { useAnimator, Animation } from '../scss/animations';
import { Input, Checkbox, NumberGroup } from '../components/ui/elements/Input';
import { Button } from '../components/ui/elements/Button';

enum ErrorType {
	NONE,
	INVALID_EMAIL,
	INAVLID_PASSWORD,
	SERVER_ERROR
};

enum LoginState {
	Login,
	TFA,
	Register,
	ResetPassword,
	Disabled
};

export default function Login() {
	let [ error, setError ] = useState({ type: ErrorType.NONE, reason: '' });
	let [ state, setState ] = useState(LoginState.Login);

	let [ email, setEmail ] = useState('');
	let [ username, setUsername ] = useState('');
	let [ password, setPassword ] = useState('');
	let [ acceptTOS, setTOS ] = useState('');

	let [ animation, playAnimation ] = useAnimator(Animation.BOUNCE_IN, 250);

	function submitForm(e: React.FormEvent, setPage: (page: Page) => void) {
		e.preventDefault();
		toggle(LoginState.TFA);
		
		/*
		Instance.client.login(email, password).then((tfa) => {
			if (tfa) {
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
		});*/
	}

	function toggle(target: LoginState, e?: React.MouseEvent) {
		e && e.preventDefault();
		playAnimation(Animation.SCALE_OUT, 200)
			.then(() => {
				playAnimation(Animation.BOUNCE_IN, 200);
				setState(target)	
			});
	}

	let app = useContext(AppContext);
	return (
		<div className={styles.wrapper}>
			{ error.type !== 0 && <Notification title='Failed to login' text={error.reason} /> }
			<div className={styles.overlay} />
			<div className={styles.login}>
				<div className={styles.left}>
					<img alt="Riot" className={styles.logo} src={logo} draggable={false}/>
				</div>
				<div className={styles.right} style={animation.styles}>
					<form className={styles.form} onSubmit={ev => submitForm(ev, app.setPage)}>
						{ state === LoginState.Register ?
							<div>
								<div className={styles.welcome}>Create an account</div>
								<span className={styles.title}>Email</span>
								<Input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
								<span className={styles.title}>Username</span>
								<Input type="text" required value={username} onChange={e => setUsername(e.target.value)} />
								<span className={styles.title}>Password</span>
								<Input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
								<Checkbox required value={acceptTOS} onChange={e => setTOS(e.target.value)}>
									I agree to Riot's <a href="/somewhere/idk" target="_blank" className={styles.link}>Terms of Service</a> and <a href="/test" className={styles.link}>Community Guidelines</a>
								</Checkbox>
								<Button theme="confirm" type="submit" value="Sign up" fullwidth={true} />

								<span className={styles.signin}>Have an account? <a href="/login" className={styles.link} onClick={e => toggle(LoginState.Login, e)}>Sign in</a></span>
							</div>
							: state === LoginState.Login ?
							<div>
								<div className={styles.welcome}>Welcome back!</div>

								<span className={styles.title}>Email</span><span>- Error message here</span>
								<Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
								<span className={styles.title}>Password</span>
								<Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
								<a className={styles.link} href="/forgot" onClick={e => toggle(LoginState.ResetPassword, e)}>Forgot your password?</a>
								<Button theme="confirm" type="submit" value="Log in" fullwidth={true} />

								<span className={styles.signin}>Need an account? <a href="/register" className={styles.link} onClick={e => toggle(LoginState.Register, e)}>Sign up</a></span>
							</div>
							: state === LoginState.TFA ?
							<div>
								<div className={styles.welcome}>Two-Factor Authentication</div>
								<NumberGroup digits={6} />
								<a href="/login" className={styles.link} onClick={e => toggle(LoginState.Login, e)}>Resend Code</a>
								<Button theme="confirm" type="submit" value="Log in" fullwidth={true} />
								<Button theme="cancel" type="submit" value="Cancel" onClick={e => toggle(LoginState.Login, e)} fullwidth={true} />
							</div>
							: state === LoginState.Disabled ?
							<div>
								<div className={styles.welcome}>Account Disabled</div>
								<div>you been a really bad boy</div>
							</div>
							: <div>
								<div className={styles.welcome}>Forgot your password?</div>
								<div>No worries, just enter your e-mail and we'll send you instructions to reset your password.</div>
								<span className={styles.title}>Email</span>
								<Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
								<Button theme="confirm" type="submit" value="Send E-Mail" fullwidth={true} />
								<span className={styles.signin}>Remembered your password? <a href="/register" className={styles.link} onClick={e => toggle(LoginState.Login, e)}>Log in</a></span>
							</div>
						}
					</form>
				</div>
			</div>
		</div>
	);
}