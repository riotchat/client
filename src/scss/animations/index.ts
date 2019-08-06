import styles from './anim.module.scss';
import { CSSProperties, useState } from 'react';

export enum Animation {
	SLIDE_IN,
	SLIDE_OUT,
	FADE_IN,
	FADE_OUT,
	SCALE_IN,
	SCALE_OUT,
	BOUNCE_IN,
	PAGE_IN,
	PAGE_OUT
};

export interface Animatable {
	running: boolean
	styles: CSSProperties
};

const ANIMATIONS: {
	[key in Animation]: [string, boolean]
} = {
	[Animation.SLIDE_IN]: [styles.slideIn, true],
	[Animation.SLIDE_OUT]: [styles.slideOut, false],
	[Animation.FADE_IN]: [styles.fadeIn, true],
	[Animation.FADE_OUT]: [styles.fadeOut, false],
	[Animation.SCALE_IN]: [styles.scaleIn, true],
	[Animation.SCALE_OUT]: [styles.scaleOut, false],
	[Animation.BOUNCE_IN]: [styles.bounceIn, true],
	[Animation.PAGE_IN]: [styles.pageIn, true],
	[Animation.PAGE_OUT]: [styles.pageOut, false]
};

function createAnimator(animation?: string | Animation, duration?: number): Animatable {
	if (typeof animation !== 'undefined') {
		return {
			running: true,
			styles: {
				animationName: typeof animation === 'number' ? ANIMATIONS[animation][0] : animation,
				animationDuration: duration + 'ms',
			}
		}
	}

	return {
		running: false,
		styles: { }
	};
}

export function useAnimator(animation?: Animation, duration?: number): [ Animatable, (animation: Animation, duration: number) => Promise<void> ] {
	let [ self, set ] = useState(createAnimator(animation, duration));
	return [ self,
		(animation: Animation, duration: number) => {
			return playAnimation(set, animation, duration);
		}
	];
}

function playAnimation(setAnimator: (anim: Animatable) => void, animation: Animation, duration: number = 500): Promise<void> {
	return new Promise(resolve => {
		let [ animationName, reset ] = ANIMATIONS[animation];
		setAnimator(createAnimator(animationName, duration));

		setTimeout(() => {
			reset && setAnimator(createAnimator());
			resolve();
		}, duration);
	});
}