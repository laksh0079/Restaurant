export function centsToDollar(cents) {
	return (Math.round(cents) / 100).toFixed(2);
}

export let favCart = JSON.parse(localStorage.getItem('favCart')) || [];
