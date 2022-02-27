const errorsValidation = inputErrors =>
	Object.values(inputErrors).every(v => v === '');

export default errorsValidation;
