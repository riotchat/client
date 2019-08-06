import React, { useState } from 'react';
import styles from './MessageBox.module.scss';
import Textarea from 'react-textarea-autosize';
import { Icon } from './Icon';

export default function MessageBox(props: { send: (value: string) => void, placeholder: string }) {
	let [ value, setValue ] = useState('');

	function onPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.keyCode === 13) {
			if (e.shiftKey) return;

			e.preventDefault();
			setValue('');
			props.send(value);
		}
	}

	return (
        <div className={styles.wrapper}>
            <div className={styles.typeIndicator}></div>
            <div className={styles.messageBox}>
                <form>
					<Textarea
						maxRows={5}
						value={value}
						onChange={e => setValue(e.target.value)}
						className={styles.textarea}
                        onKeyDown={onPress}
                        autoFocus={true}
                        placeholder={props.placeholder} />
					<div className={styles.buttons}>
                        <div className={styles.button}>
					        <Icon icon='cardSolid' />
				        </div>
                        <div className={styles.button}>
					        <Icon icon='cardSolid' />
				        </div>
                        <div className={styles.button}>
					        <Icon icon='cardSolid' />
				        </div>
					</div>
                </form>
            </div>
        </div>
	);
}