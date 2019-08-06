import React, { createContext, Fragment, useContext, useState } from "react";
import UserProfile from "./profile/UserProfile";
import { User } from "riotchat.js";

export const ModalContext = createContext<{
	showProfile: boolean
	profileUser?: User
	setProfile: (user?: User) => void
} | undefined>(undefined);

export function useModals() {
	/* User Profile */
	let [ showProfile, setProfile ] = useState(false);
	let [ profileUser, setProfileUser ] = useState<User>();

	return {
		showProfile,
		profileUser,
		setProfile: (user?: User) => user ?
			(setProfile(true) as any || setProfileUser(user)) : setProfile(false)
	};
}

export function Modals() {
	let modals = useContext(ModalContext);
	if (!modals) return null;

	return (
		<Fragment>
			{ modals.showProfile &&
				<UserProfile user={modals.profileUser} dismiss={() => modals && modals.setProfile()} /> }
		</Fragment>
	);
}