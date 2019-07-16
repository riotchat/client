import React, { useState, useContext } from 'react';
import { AppContext, Page } from '../App';
import { Instance } from '../internal/Client';

import logo from '../assets/downloads/branding/logo-white-full.svg';
import styles from './Login.module.scss';
import Notification from '../components/ui/components/Notification';
import Modal from '../components/ui/components/Modal';
import { useAnimator, Animation } from '../scss/animations';
import { Input, Checkbox } from '../components/ui/elements/Input';
import { Button } from '../components/ui/elements/Button';

enum ErrorType {
	NONE,
	INVALID_EMAIL,
	INAVLID_PASSWORD,
	SERVER_ERROR
};

export default function Login() {
	let [ error, setError ] = useState({ type: ErrorType.NONE, reason: '' });
	let [ doRegister, setRegister ] = useState(false);
	let [ tfaModal, setTFA ] = useState(false);

	let [ email, setEmail ] = useState('');
	let [ username, setUsername ] = useState('');
	let [ password, setPassword ] = useState('');
	let [ acceptTOS, setTOS ] = useState('');

	let [ animation, playAnimation ] = useAnimator(Animation.BOUNCE_IN, 250);

	function submitForm(e: React.FormEvent, setPage: (page: Page) => void) {
		e.preventDefault();
		setTFA(true);
		
		Instance.client.login(email, password).then((tfa) => {
			if (tfa) {
				setTFA(true);
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

	function toggle(e: React.MouseEvent) {
		e.preventDefault();
		playAnimation(Animation.SCALE_OUT, 200)
			.then(() => {
				playAnimation(Animation.BOUNCE_IN, 200);
				setRegister(!doRegister)	
			});
	}

	let app = useContext(AppContext);
	return (
		<div className={styles.wrapper}>
			<div className={styles.overlay}>
				{ error.type !== 0 && <Notification title='Failed to login' text={error.reason} /> }
			</div>
			<div className={styles.login}>
				{ tfaModal &&
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

				<div className={styles.left}>
					<img alt="Riot" className={styles.logo} src={logo} draggable={false}/>
				</div>
				<div className={styles.right} style={animation.styles}>
					<form className={styles.form} onSubmit={ev => submitForm(ev, app.setPage)}>
						{ doRegister ?
							<div>
								<div className={styles.welcome}>Create an account</div>
								<span className={styles.title}>Email</span>
								<Input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
								<span className={styles.title}>Username</span>
								<Input type="text" required value={username} onChange={e => setUsername(e.target.value)} />
								<span className={styles.title}>Password</span>
								<Input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
								<Checkbox required value={acceptTOS} onChange={e => setTOS(e.target.value)}>
									I agree to Riot's <a href="/somewhere/idk" className={styles.link}>Terms of Service</a> and <a href="/test" className={styles.link}>Community Guidelines</a>
								</Checkbox>
								<Button theme="confirm" type="submit" value="Sign up" fullWidth={true} />

								<span className={styles.signin}>Have an account? <a href="/login" className={styles.link} onClick={e => toggle(e)}>Sign in</a></span>
							</div>
							: <div>
								<div className={styles.welcome}>Welcome back!</div>

								<span className={styles.title}>Email</span>
								<Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
								<span className={styles.title}>Password</span>
								<Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
								<a className={styles.link} href="/forgotidk">Forgot your password?</a>
								<Button theme="confirm" type="submit" value="Log in" fullWidth={true} />

								<span className={styles.signin}>Need an account? <a href="/register" className={styles.link} onClick={e => toggle(e)}>Sign up</a></span>
							</div>
						}
					</form>
				</div>
			</div>
		</div>
	);
}