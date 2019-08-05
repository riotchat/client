import React, { useContext } from 'react';
import main from '../index.module.scss';
import styles from './Appearance.module.scss';

import { Icon } from '../../../../components/ui/elements/Icon';
import { AppContext } from '../../../../App';

import lightTheme from '../../../../assets/images/light.svg';
import darkTheme from '../../../../assets/images/dark.svg';

export default function Appearance() {
	let app = useContext(AppContext);

	let colors: Array<string> =
		["#7B68EE", "#3498DB", "#1ABC9C", "#F1C40F", "#FF7F50", "#E91E63", "#D468EE",
		"#594CAD", "#206694", "#11806A", "#C27C0E", "#CD5B45", "#AD1457", "#954AA8"];
	let hasCustomColor = colors.indexOf(app.accent) === -1;
	return (
		<div className={styles.panel}>
                <div className={main.section}>
                    <div className={main.category}>Theme</div>
                        <div className={styles.themePicker}>
                            <div className={styles.theme}>
                                <div className={styles.light} onClick={() => app.setTheme('light')}>
                                    <img alt="Light Mode" src={lightTheme} draggable={false}
										data-active={app.theme === 'light'} />
                                </div>
                                <span className={styles.type}>Light</span>
                            </div>
                            <div className={styles.theme}>
								<div className={styles.dark} onClick={() => app.setTheme('dark')}>
                                    <img alt="Dark Mode" src={darkTheme} draggable={false}
										data-active={app.theme === 'dark'} />
                                </div>
                                <span className={styles.type}>Dark</span>
                            </div>
                        </div>
                </div>
                <div className={main.section}>
                    <div className={main.category}>Accent Color</div>
					<div className={styles.colorPicker}>
                        <span className={styles.customColor} style={{background: hasCustomColor ? app.accent : "grey"}}>
                            { hasCustomColor && (
                                <Icon className={styles.check} icon="checkRegular"/>
                            )}
                            <Icon className={styles.edit} icon="brushSolid"/>
                        </span>
                        <div className={`${styles.colorGrid} ${styles.disabled}`} style={{ gridTemplateColumns: "29px ".repeat(Math.floor(colors.length / 2)) }}>
                            {colors.map((value) => {
                                return (
                                    <span key={`acc${value}`} className={styles.color} style={{ backgroundColor: value }} onClick={() => app.setAccent(value)}>
                                        { app.accent === value && (
                                            <Icon className={styles.check} icon="checkRegular"/>
                                        )}
                                    </span>
                                )
                            })}
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