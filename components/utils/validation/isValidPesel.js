const isValidPesel = pesel => {
	const monthWithCentury = Number(pesel.substring(2, 4));

	if (!monthWithCentury || monthWithCentury % 20 > 12) {
		return false;
	}

	const day = Number(pesel.substring(4, 6));
	if (!day || day < 1 || day > 31) {
		return false;
	}

	if (!/^[0-9]{11}$/u.test(pesel)) {
		return false;
	}

	const times = [1, 3, 7, 9];
	const digits = `${pesel}`.split(``).map(digit => {
		return parseInt(digit, 10);
	});

	const [dig11] = digits.splice(-1);

	const control =
		digits.reduce((previousValue, currentValue, index) => {
			return previousValue + currentValue * times[index % 4];
		}) % 10;

	return 10 - (control === 0 ? 10 : control) === dig11;
};

export default isValidPesel;
