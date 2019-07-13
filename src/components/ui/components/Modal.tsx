import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.scss';
import { Button } from './Button';
import Link from '../elements/Link';

interface ModalProps {
	title: string
	dismiss?: () => void

	//children: ReactNode[] | ReactNode
};

export default function Modal(props: ModalProps) {
	let [ closing, setClosing ] = useState(false);

	function handleClose(e?: React.MouseEvent) {
		if (e && (e.target !== e.currentTarget)) return;
		if (!props.dismiss) return;

		setClosing(true);
		setTimeout(() => {
			(props.dismiss as Function)();
		}, 250);
	}

	let modalClasses = classNames(styles.modal, {
		[styles.animInB]: !closing,
		[styles.animOutB]: closing
	});

	let classes = classNames(styles.root, {
		[styles.animateIn]: !closing,
		[styles.animateOut]: closing
	});

	return (
		<div className={modalClasses} onClick={handleClose}>
			<div className={classes}>
				<div className={styles.container}>
					<span className={styles.title}>{props.title}</span>
					<p>blah blah blah<br/>this may do a thing that you dotn want, word wrap pls as well ok thank</p>
                    <Link href='#'>Learn more</Link>
				</div>
				<div className={styles.footer}>
                    <Button type='warning'>Delete Channel</Button>
                    <Button>Cancel</Button>
				</div>
			</div>
		</div>
	);
}