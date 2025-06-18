export const formatCR = (cr) => {
	switch (cr) {
		case 0.125:
			return '1/8';
		case 0.25:
			return '1/4';
		case 0.5:
			return '1/2';
		default:
			return String(cr);
	}
};
