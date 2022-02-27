import isValidPesel from './isValidPesel';

const peselToBirthday = pesel => {
	if (isValidPesel(pesel)) {
		let year = parseInt(pesel.substring(0, 2), 10);
		let month = parseInt(pesel.substring(2, 4), 10) - 1;
		let day = parseInt(pesel.substring(4, 6), 10);
		let birthday = null;

		if (month > 80) {
			year = year + 1800;
			month = month - 80;
		} else if (month >= 60) {
			year = year + 2200;
			month = month - 60;
		} else if (month >= 40) {
			year = year + 2100;
			month = month - 40;
		} else if (month >= 20) {
			year = year + 2000;
			month = month - 20;
		} else {
			year += 1900;
		}

		if (month >= 0 && month < 12 && day > 0 && day < 32) {
			const monthFormat = month + 1 < 10 ? `0${month + 1}` : month + 1;
			birthday = `${day}-${monthFormat}-${year}`;
		} else {
			birthday = false;
		}

		return birthday;
	}

	return 'Data pojawi się po weryfikacji PESEL.';
};

export default peselToBirthday;
