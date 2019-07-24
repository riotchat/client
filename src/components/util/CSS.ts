import { useState } from "react";

export function useVar(key: string, ref?: HTMLElement) {
	let [ value, setValue ] = useState<any>();

	return [ value, (ref?: HTMLElement) => ref &&
		setValue(getComputedStyle(ref)
		.getPropertyValue('--' + key)) ];
}