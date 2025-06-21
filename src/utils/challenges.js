const challenges = [
	{ label: '0', value: '0' },
	{ label: '1/8', value: '0.125' },
	{ label: '1/4', value: '0.25' },
	{ label: '1/2', value: '0.5' },
];

for (let i = 1; i <= 30; i++) {
	challenges.push({
		label: `${i}`,
		value: `${i}`,
	});
}

export default challenges;
