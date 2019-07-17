import { FunctionComponent, createElement, CSSProperties } from 'react';
import styles from './Icon.module.scss';

/* === SOLID ICONS === */
import { ReactComponent as cogSolid } from 'boxicons/svg/solid/bxs-cog.svg';
import { ReactComponent as homeSolid } from 'boxicons/svg/solid/bxs-home.svg';

/* === REGULAR ICONS === */
import { ReactComponent as plusRegular } from 'boxicons/svg/regular/bx-plus.svg';

type Icons = 'cogSolid' | 'plusRegular' | 'homeSolid';
const INDEX: { [key in Icons]: FunctionComponent } = { cogSolid, plusRegular, homeSolid };
type IconProps = {
	icon: Icons,
	color?: string
}

export function Icon(props: IconProps) {
	const style: CSSProperties = {
		fill: props.color
	};
	return createElement(INDEX[props.icon], { className: styles.icon, style } as any);
}