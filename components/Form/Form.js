import React, { useState } from 'react';
import styles from '../../styles/Form.module.css';
import Portal from '../HOC/Portal';
import Modal from '../UI/Modal';

import errorsValidation from '../utils/validation/errorsValidation';
import messages from './messages';
import peselToBirthday from '../utils/validation/peselToBirthday';
import sendContactData from '../utils/form/sendContactData';
import validation from '../utils/validation/validation';

const Form = () => {
	const initialState = {
		name: '',
		surname: '',
		pesel: '',
	};

	const initialErrors = {
		name: '',
		surname: '',
		pesel: '',
	};

	const [values, setValues] = useState(initialState);
	const [errors, setErrors] = useState(initialErrors);
	const [modalMsg, setModalMsg] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleInputChange = e => {
		if (e.target.name === 'pesel') {
			setValues({
				...values,
				[e.target.name]: e.target.value.replace(/\D/g, ''),
			});
		} else {
			setValues({
				...values,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsModalOpen(true);

		if (errorsValidation(validation(values))) {
			setModalMsg(messages.success);
			try {
				setErrors(initialErrors);
				setValues(initialState);
				await sendContactData({
					name: values.name,
					surname: values.surname,
					pesel: values.pesel,
				});
			} catch (error) {
				setModalMsg(error.message);
			}
		} else {
			setErrors(validation(values));
			setModalMsg(messages.error);
		}
	};

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Imię</label>
					<input
						value={values.name}
						onChange={handleInputChange}
						id="name"
						name="name"
						type="text"
						maxLength={20}
					/>
					{errors.name && <p>{errors.name}</p>}
				</div>
				<div>
					<label htmlFor="surname">Nazwisko</label>
					<input
						value={values.surname}
						onChange={handleInputChange}
						id="surname"
						name="surname"
						type="text"
						maxLength={30}
					/>
					{errors.surname && <p>{errors.surname}</p>}
				</div>
				<div>
					<label htmlFor="pesel">PESEL</label>
					<input
						value={values.pesel}
						onChange={handleInputChange}
						id="pesel"
						name="pesel"
						type="text"
						maxLength={11}
					/>
					{errors.pesel && <p>{errors.pesel}</p>}
				</div>
				<div>
					<label htmlFor="birthday">Data urodzenia</label>
					<input
						disabled={true}
						value={peselToBirthday(values.pesel)}
						id="birthday"
						type="text"
					/>
				</div>
				<button type="submit">Wyślij</button>
			</form>
			<Portal>
				<Modal
					isOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					modalMsg={modalMsg}
				>
					{modalMsg}
				</Modal>
			</Portal>
		</>
	);
};

export default Form;
