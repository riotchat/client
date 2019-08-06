import React from 'react';

import Modal from "../../../../components/ui/components/Modal";
import { User } from "riotchat.js";

interface ProfileProps {
	user?: User
	dismiss: () => void
};

export default function UserProfile(props: ProfileProps) {
	return (
		<Modal allowClose={true} dismiss={props.dismiss}>
			{ props.user ? props.user.username : 'no user' }
		</Modal>
	);
}