import React, { Component } from 'react';
import styles from './ErrorBoundary.module.scss';

import { Icon } from '../ui/elements/Icon';

export default class ErrorBoundary extends Component<{}, { error?: Error }> {
	constructor() {
		super({ });
		this.state = { };
	}

	componentDidCatch(error: Error) {
		this.setState({ error });
	}

	render() {
		if (this.state.error) {
			return (
				<div className={styles.root}>
					<Icon icon='xRegular' />
					<h1>Well, this is really awkward...</h1>
					<p>Something went wrong.</p>
                    {this.state.error.name}: { this.state.error.message }
                    { this.state.error.stack && <pre><code>{ this.state.error.stack.split('\n').slice(0, 5).join('\n') }</code></pre> }
                    <div className={styles.note}>Riot crashed unexpectedly. A crash report has been dispatched.</div>
				</div>
			);
		}

		return this.props.children;
	}
}