import errorsValidation from '../../components/utils/validation/errorsValidation';
import messages from '../../components/form/messages';
import validation from '../../components/utils/validation/validation';

const handler = (req, res) => {
	if (req.method === 'POST') {
		const { name, surname, pesel } = req.body;
		const values = { name, surname, pesel };

		if (!errorsValidation(validation(values))) {
			res.status(422).json({ message: messages.error });
			return;
		}

		res.status(201).json({ message: messages.success });
	}
};

export default handler;
