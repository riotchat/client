import { FunctionComponent, createElement, CSSProperties, SVGProps } from 'react';
import styles from './Icon.module.scss';
import classNames from 'classnames';

/* === SOLID ICONS === */
import { ReactComponent as cogSolid } from 'boxicons/svg/solid/bxs-cog.svg';
import { ReactComponent as homeSolid } from 'boxicons/svg/solid/bxs-home.svg';
import { ReactComponent as newsSolid } from 'boxicons/svg/solid/bxs-news.svg';
import { ReactComponent as userDetailSolid } from 'boxicons/svg/solid/bxs-user-detail.svg';
import { ReactComponent as userPlusSolid } from 'boxicons/svg/solid/bxs-user-plus.svg';

import { ReactComponent as shieldSolid } from 'boxicons/svg/solid/bxs-check-shield.svg';
import { ReactComponent as idCardSolid } from 'boxicons/svg/solid/bxs-id-card.svg';
import { ReactComponent as extensionSolid } from 'boxicons/svg/solid/bxs-extension.svg';
import { ReactComponent as microphoneSolid } from 'boxicons/svg/solid/bxs-microphone.svg';


/* === REGULAR ICONS === */
import { ReactComponent as plusRegular } from 'boxicons/svg/regular/bx-plus.svg';
import { ReactComponent as mobileRegular } from 'boxicons/svg/regular/bx-mobile.svg';
import { ReactComponent as chevronDownRegular } from 'boxicons/svg/regular/bx-chevron-down.svg';

export type Icons = 'cogSolid' | 'plusRegular' | 'homeSolid' | 'newsSolid' | 'userDetailSolid'
					| 'userPlusSolid' | 'mobileRegular' | 'chevronDownRegular' | 'shieldSolid'
					| 'idCardSolid' | 'extensionSolid' | 'microphoneSolid';
const INDEX: { [key in Icons]: FunctionComponent } = {  cogSolid, plusRegular, homeSolid, newsSolid, 
														userDetailSolid, userPlusSolid, mobileRegular,
														chevronDownRegular, shieldSolid, idCardSolid,
														extensionSolid, microphoneSolid };
interface IconProps extends SVGProps<SVGElement> {
	icon: Icons,
	color?: string,
	className?: string
}

export function Icon(props: IconProps) {
	const style: CSSProperties = {
		fill: props.color
	};
	return createElement(INDEX[props.icon], { className: classNames(styles.icon, props.className), style, ...props } as any);
}