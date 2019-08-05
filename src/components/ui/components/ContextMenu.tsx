import React, { useState, ReactNode, useEffect } from "react";
import styles from './ContextMenu.module.scss';

import classNames from 'classnames';
import { useMediaQuery, SwipeableDrawer } from "@material-ui/core";
import { useVar } from "../../util/CSS";
import Helmet from "react-helmet";

interface ContextProps {
	visible: boolean,
	setVisible: (visible: boolean) => void
	position: number[],
	children: ReactNode[] | ReactNode
};

export function ContextMenu(props: ContextProps) {
	let isDesktop = useMediaQuery('(min-width: 768px)');
	let [ color, processRef ] = useVar('context-open');

	let reference: HTMLElement | null;
	function onClick(e: MouseEvent) {
		if (reference && e.target &&
				!reference.contains(e.target as HTMLElement))
			props.setVisible(false);
	}

	useEffect(() => {
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	});

	if (isDesktop) {
		if (!props.visible) return null;
		return (
			<div className={classNames(styles.floating, styles.menu)}
				ref={ref => {
					reference = ref;
					processRef(ref);
				}}
				style={{ left: props.position[0], top: props.position[1] }}>
				{props.children}
			</div>
		);
	}

	return (
		<SwipeableDrawer
			anchor="bottom"
			open={props.visible}
			onOpen={() => props.setVisible(true)}
            onClose={() => props.setVisible(false)}
            classes={{
                paper: styles.menu
			}}
			swipeAreaWidth={0}
			ref={processRef}
		>
			<Helmet>
				<meta name="theme-color" content={color} />
			</Helmet>
			{props.children}
		</SwipeableDrawer>
	);
}

export default function useContextMenu(children: ReactNode[] | ReactNode): [ JSX.Element, (x?: number, y?: number) => void, () => void ] {
	let [ visible, setVisible ] = useState(false);
	let [ position, setPosition ] = useState([0, 0]);

	function show(x?: number, y?: number) {
		navigator.vibrate(100);
		setVisible(true);
		if (x && y) {
			setPosition([x, y]);
		}
	}

	function hide() {
		setVisible(false);
	}

	return [ <ContextMenu position={position} visible={visible}
				setVisible={setVisible} children={children} />, show, hide ];
}