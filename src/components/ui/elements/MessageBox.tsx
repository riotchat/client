import React from 'react';
import styles from './MessageBox.module.scss';

export default function MessageBox(props: { value: string, onChange: (value: string) => void }) {
	return (
        <div className={styles.wrapper}>
            <div className={styles.typeIndicator}></div>
            <div className={styles.messageBox}>
                <form>
                    <textarea placeholder="Message channel"
                        value={props.value} onChange={e => props.onChange(e.target.value)} />
                </form>
            </div>
        </div>
	);
}