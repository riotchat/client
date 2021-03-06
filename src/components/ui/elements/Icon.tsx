import React, { createElement, CSSProperties, SVGProps } from 'react';
import styles from './Icon.module.scss';
import classNames from 'classnames';
import { remove } from 'flatbase/dist/util/props';

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
import { ReactComponent as cardSolid } from 'boxicons/svg/solid/bxs-credit-card.svg';
import { ReactComponent as brushSolid } from 'boxicons/svg/solid/bxs-brush.svg';
import { ReactComponent as slideshowSolid } from 'boxicons/svg/solid/bxs-slideshow.svg';
import { ReactComponent as wrenchSolid } from 'boxicons/svg/solid/bxs-wrench.svg';
import { ReactComponent as infoCircleSolid } from 'boxicons/svg/solid/bxs-info-circle.svg';
import { ReactComponent as helpCircleSolid } from 'boxicons/svg/solid/bxs-help-circle.svg';
import { ReactComponent as megaphoneSolid } from 'boxicons/svg/solid/bxs-megaphone.svg';
import { ReactComponent as chatSolid } from 'boxicons/svg/solid/bxs-chat.svg';
import { ReactComponent as groupSolid } from 'boxicons/svg/solid/bxs-group.svg';
import { ReactComponent as bellSolid } from 'boxicons/svg/solid/bxs-bell.svg';
import { ReactComponent as userXSolid } from 'boxicons/svg/solid/bxs-user-x.svg';
import { ReactComponent as videoSolid } from 'boxicons/svg/solid/bxs-video.svg';
import { ReactComponent as userMinusSolid } from 'boxicons/svg/solid/bxs-user-minus.svg';
import { ReactComponent as phoneCallSolid } from 'boxicons/svg/solid/bxs-phone-call.svg';
import { ReactComponent as shareAltSolid } from 'boxicons/svg/solid/bxs-share-alt.svg';
import { ReactComponent as smileyHappySolid } from 'boxicons/svg/solid/bxs-smiley-happy.svg';
import { ReactComponent as pencilSolid } from 'boxicons/svg/solid/bxs-pencil.svg';
import { ReactComponent as pinSolid } from 'boxicons/svg/solid/bxs-pin.svg';

/* === REGULAR ICONS === */
import { ReactComponent as plusRegular } from 'boxicons/svg/regular/bx-plus.svg';
import { ReactComponent as mobileRegular } from 'boxicons/svg/regular/bx-mobile.svg';
import { ReactComponent as chevronDownRegular } from 'boxicons/svg/regular/bx-chevron-down.svg';
import { ReactComponent as bodyRegular } from 'boxicons/svg/regular/bx-body.svg';
import { ReactComponent as globeRegular } from 'boxicons/svg/regular/bx-globe.svg';
import { ReactComponent as fileRegular } from 'boxicons/svg/regular/bx-file.svg';
import { ReactComponent as logoutRegular } from 'boxicons/svg/regular/bx-log-out.svg';
import { ReactComponent as leftArrowAltRegular } from 'boxicons/svg/regular/bx-left-arrow-alt.svg';
import { ReactComponent as xRegular } from 'boxicons/svg/regular/bx-x.svg';
import { ReactComponent as checkRegular } from 'boxicons/svg/regular/bx-check.svg';
import { ReactComponent as atRegular } from 'boxicons/svg/regular/bx-at.svg';
import { ReactComponent as menuRegular } from 'boxicons/svg/regular/bx-menu.svg';
import { ReactComponent as copyAltRegular } from 'boxicons/svg/regular/bx-copy-alt.svg';

import { ClassValue } from 'classnames/types';

export type Icons = 'padding' | 'cogSolid' | 'plusRegular' | 'homeSolid' | 'newsSolid' | 'userDetailSolid'
					| 'userPlusSolid' | 'mobileRegular' | 'chevronDownRegular' | 'shieldSolid'
					| 'idCardSolid' | 'extensionSolid' | 'microphoneSolid' | 'cardSolid' | 'brushSolid'
					| 'bodyRegular' | 'slideshowSolid' | 'globeRegular' | 'wrenchSolid' | 'infoCircleSolid'
					| 'fileRegular' | 'helpCircleSolid' | 'megaphoneSolid' | 'logoutRegular' | 'leftArrowAltRegular'
					| 'xRegular' | 'checkRegular' | 'atRegular' | 'chatSolid' | 'groupSolid' | 'menuRegular'
					| 'bellSolid' | 'userXSolid' | 'videoSolid' | 'userMinusSolid' | 'phoneCallSolid'
					| 'copyAltRegular' | 'shareAltSolid' | 'smileyHappySolid' | 'pencilSolid' | 'pinSolid';
const INDEX= {  cogSolid, plusRegular, homeSolid, newsSolid, 
				userDetailSolid, userPlusSolid, mobileRegular,
				chevronDownRegular, shieldSolid, idCardSolid,
				extensionSolid, microphoneSolid, cardSolid,
				brushSolid, bodyRegular, slideshowSolid,
				globeRegular, wrenchSolid, infoCircleSolid,
				fileRegular, helpCircleSolid, megaphoneSolid,
				logoutRegular, leftArrowAltRegular, xRegular,
				checkRegular, atRegular, chatSolid, groupSolid,
				menuRegular, bellSolid, userXSolid, videoSolid,
				phoneCallSolid, userMinusSolid, copyAltRegular,
				shareAltSolid, smileyHappySolid, pencilSolid,
				pinSolid };
interface IconProps extends Omit<SVGProps<SVGElement>, 'className'> {
	icon: Icons,
	color?: string,
	className?: ClassValue[] | ClassValue
}

export function Icon(props: IconProps) {
	const style: CSSProperties = {
		fill: props.color
	};

	if (props.icon === 'padding') {
		return <div className={styles.icon}></div>;
	}

	return createElement((INDEX as any)[props.icon], {
		className: classNames(styles.icon, props.className), style, ...remove(props, ['className']) } as any);
}