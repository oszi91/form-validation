const sendContactData = async details => {
	const response = await fetch('/api/form', {
		method: 'POST',
		body: JSON.stringify(details),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Błąd');
	}
};

export default sendContactData;
