import React, { InputHTMLAttributes, useState } from 'react';
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