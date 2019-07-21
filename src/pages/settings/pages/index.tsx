import React from 'react';
import { Page } from '../../Settings';

import Account from './userSettings/Account';
import AuthorizedApps from './userSettings/AuthorizedApps';
import Integrations from './userSettings/Integrations';

import Pro from './riotPRO/Pro';
import Billing from './riotPRO/Billing';

import Appearance from './clientSettings/Appearance';
import Voice from './clientSettings/Voice';
import Accessibility from './clientSettings/Accessibility';
import Streamer from './clientSettings/Streamer';
import Language from './clientSettings/Language';
import Developer from './clientSettings/Developer';

import About from './about/About';
import Changelog from './about/Changelog';
import Support from './about/Support';
import Feedback from './about/Feedback';

export function RenderPage(page: Page) {
	switch (page) {
		case Page.ACCOUNT: return <Account />
		case Page.APPS: return <AuthorizedApps />
		case Page.INTEGRATIONS: return <Integrations />

		case Page.PRO: return <Pro />
		case Page.BILLING: return <Billing />

		case Page.VOICE: return <Voice />
		case Page.APPEARANCE: return <Appearance />
		case Page.ACCESSIBILITY: return <Accessibility />
		case Page.STREAMER: return <Streamer />
		case Page.LANGUAGE: return <Language />
		case Page.DEVELOPER: return <Developer />

		case Page.ABOUT: return <About />
		case Page.CHANGELOG: return <Changelog />
		case Page.SUPPORT: return <Support />
		case Page.FEEDBACK: return <Feedback />
	}
}