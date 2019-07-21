import React from 'react';

import { Icon } from '../../../../components/ui/elements/Icon';
import main from '../index.module.scss';
import styles from './Appearance.module.scss';

import lightTheme from '../../../../assets/images/light.svg';
import darkTheme from '../../../../assets/images/dark.svg';

export default function Appearance() {
	return (
		<div className={styles.panel}>
                <div className={main.section}>
                    <div className={main.category}>Theme</div>
                        <div className={styles.themePicker}>
                            <div className={styles.theme}>
                                <div className={styles.light}>
                                    <img alt="Light Mode" src={lightTheme} draggable={false}/>
                                </div>
                                <span className={styles.type}>Light</span>
                            </div>
                            <div className={styles.theme}>
                                <div className={styles.dark}>
                                    <img alt="Dark Mode" src={darkTheme} draggable={false}/>
                                </div>
                                <span className={styles.type}>Dark</span>
                            </div>
                        </div>
                </div>
                <div className={main.section}>
                    <div className={main.category}>Accent Color</div>
                    <div className={styles.colorPicker}>
                        <a className={styles.customColor}>
                            <Icon className={styles.check} icon="checkRegular"/>
                            <Icon className={styles.edit} icon="brushSolid"/>
                        </a>
                        <div className={`${styles.colorGrid} ${styles.disabled}`}>
                            <a className={styles.color}>
								<Icon className={styles.check} icon="checkRegular"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={main.section}>
                    <div className={main.category}>Message Display</div>
                        {/*<RadioGroup>
							<Checkbox type="radio" text="Default" description="Beautiful, sleek and modern."/>
							<Checkbox type="radio" text="Compact" description="Long live the IRC."/>
						</RadioGroup>*/}
                </div>
                <div className={main.section}>
                    <div className={main.category}>Sync Options</div>
					{/*<Checkbox
                        type="toggle"
						checked={true}
						text="Sync my preferences"
					description="Synchornize my appearance settings across my devices." />  */}                  
                </div>
			</div>

	);
}