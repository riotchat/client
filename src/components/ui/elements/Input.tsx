import React, { InputHTMLAttributes, useState, ReactNode, ChangeEvent, KeyboardEvent } from 'react';
import nanoid from 'nanoid';
import styles from './Input.module.scss';
import { killChildren } from '../../util/Children';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	return <input className={styles.input} {...props} />;
}

export function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
	let [ id ] = useState(nanoid());

	return (
		<div className={styles.checkbox}>
			<input id={id} type="checkbox" {...killChildren(props)} aria-label={"yeeters"}/>
			<label className={styles.label} htmlFor={id} />
			{ props.children && <span>{props.children}</span> }
		</div>
	);
}

interface NumberGroupProps extends InputHTMLAttributes<HTMLInputElement> {
	digits: number,
	separator?: number
};

export function NumberGroup(props: NumberGroupProps) {
	let [ value, setValue ] = useState(' '.repeat(props.digits));
	let inputs: ReactNode[] = [];
	let el: (HTMLInputElement | null)[] = Array(props.digits);

	function updateValue(e: ChangeEvent<HTMLInputElement>, i: number) {
		let val = e.target.value;
		
		if (val.length > 0) {
			let next = el[i + 1];
			if (next) {
				next.focus();
			}
		}

		let temp = value.substr(0, i) + (val.substr(0, 1) || ' ') + value.substr(i + 1);
		while (temp.length < props.digits) {
			temp += ' ';
		}
		setValue(temp);
	}

	function keyPress(e: KeyboardEvent<HTMLInputElement>, i: number) {
		if (e.keyCode === 8) {
			if (!value[i].trim()) {
				let prev = el[i - 1];
				if (prev) {
					prev.focus();
				}
			}
		}
	}

	for (let i=0;i<props.digits;i++) {
		if (props.separator && i !== 0 && i % props.separator === 0) {
			inputs.push(<div className={styles.separator}>—</div>);
		}
		inputs.push(<input className={styles.input} type="number" value={value[i]} onChange={e => updateValue(e, i)} ref={self => el[i] = self} onKeyDown={e => keyPress(e, i)} key={i.toString()} {...props} />);
	}

	return (
		<div className={styles.numberGroup}>
			{inputs}
		</div>
	);
}