import React, { InputHTMLAttributes, useState, ReactNode, ChangeEvent } from 'react';
import styles from './Input.module.scss';
import { killChildren } from '../../util/Children';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	return <input className={styles.input} {...props} />;
}

export function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
	let [ id ] = useState('aaa');

	return (
		<div className={styles.checkbox}>
			<input id={id} type="checkbox" {...killChildren(props)} aria-label={"yeeters"}/>
			<label className={styles.label} htmlFor={id} />
			{ props.children && <span>{props.children}</span> }
		</div>
	);
}

interface NumberGroupProps extends InputHTMLAttributes<HTMLInputElement> {
	digits: number
};

export function NumberGroup(props: NumberGroupProps) {
	let def = new Array(props.digits);
	def.fill('');

	let [ value, setValue ] = useState(def);
	let inputs: ReactNode[] = [];
	let el: (HTMLInputElement | null)[] = new Array(props.digits);

	function updateValue(e: ChangeEvent<HTMLInputElement>, i: number) {
		let val = parseInt(e.target.value);
		
		if (val.toString().length > 0) {
			let next = el[i + 1];
			if (next) {
				next.focus();
			}
		}

		if (val.toString().length > 2) {
			val = parseInt(val.toString().substr(0, 1));
		}

		value[i] = val;
        setValue(value);
	}

	for (let i=0;i<props.digits;i++) {
		inputs.push(<input value={value[i]} onChange={e => updateValue(e, i)} ref={self => el[i] = self} min={0} max={9} key={i.toString()} type="number" {...props} />);
	}

	return (
		<div className={styles.numberGroup}>
			{inputs}
			{value[0]}
		</div>
	);
}