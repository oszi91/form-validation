import hasNumber from './hasNumber';
import isValidPesel from './isValidPesel';

const validation = data => {
	let errorsList = {};

	if (!data.name || data.name.trim() === '' || data.name.length > 20) {
		errorsList = {
			...errorsList,
			name: 'Pole nie może być puste i musi mieć mniej niż 20 znaków.',
		};
	}

	if (!data.surname || data.surname.trim() === '' || data.surname.length > 30) {
		errorsList = {
			...errorsList,
			surname: 'Pole nie może być puste i musi mieć mniej niż 30 znaków.',
		};
	}

	if (
		!data.pesel ||
		data.pesel.trim() === '' ||
		data.pesel.length !== 11 ||
		!hasNumber(data.pesel)
	) {
		errorsList = {
			...errorsList,
			pesel: 'PESEL powinien zawierać 11 cyfr.',
		};
	} else if (data.pesel.length === 11) {
		if (!isValidPesel(data.pesel)) {
			errorsList = {
				...errorsList,
				pesel: 'Niepoprawny numer PESEL.',
			};
		}
	}

	return errorsList;
};

export default validation;
