import React from 'react';
import styles from './Browser.module.scss';

import { hiddenScrollbar } from "../../../components/util/Scrollbar";
import { Guild } from "./Guild";
import { Icon } from "../../../components/ui/elements/Icon";

export default function Browser() {
    return (
        <div className={`${styles.browse} ${hiddenScrollbar}`}	>
			<div className={styles.home}><Icon icon="homeSolid"/></div>
			<div className={styles.divider}/>
			{Array(50).fill(<Guild id="a" name="meme" icon="" />)}
			<div className={styles.add}>
				<Icon icon="plusRegular"/>
			</div>
		</div>
    );
}