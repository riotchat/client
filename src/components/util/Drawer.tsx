import React, { Fragment } from 'react';

import styles from './Drawer.module.scss';

type DrawerProps = {
    swipeable?: boolean,
    open: boolean,
    onChange: (open: boolean) => void
} & {
    swipeable: true,
    hysteresis?: number,
    swipeAreaWidth?: number
}

export default function Drawer(props: DrawerProps) {
    return (
        <Fragment>
            { props.swipeable && <div className={styles.swipeArea} style={{ width: props.swipeAreaWidth || 20 }} /> }
        </Fragment>
    );
}