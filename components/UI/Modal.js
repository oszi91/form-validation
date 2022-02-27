import React, { useRef } from 'react';
import styles from '../../styles/Modal.module.css';
import useOnClickOutside from '../hooks/useOnClickOutside';

import messages from '../Form/messages';

const modalStyles = {
	success: '#63eb63',
	error: '#ff0000',
};

const Modal = ({ children, isOpen, setIsModalOpen, modalMsg }) => {
	const ref = useRef();
	const isModalOpen = isOpen ? styles.isModalOpen : '';
	const msgStyles = {
		backgroundColor:
			modalMsg === messages.success ? modalStyles.success : modalStyles.error,
	};

	useOnClickOutside(ref, () => setIsModalOpen(false));

	return (
		<div
			ref={ref}
			className={`${styles.modal} ${isModalOpen}`}
			style={msgStyles}
		>
			<h1>{children}</h1>
			<button
				onClick={() => setIsModalOpen(false)}
				className={styles.close}
			></button>
		</div>
	);
};

export default Modal;
