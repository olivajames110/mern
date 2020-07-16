import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const ModalOverlay = (props) => {
	const { className, style, headerClass, header, onSubmit, contentClass, footer, footerClass } = props;

	const content = (
		<div className={`modal ${className}`} style={style}>
			<header className={`modal__header ${headerClass}`}>
				<h2>{header}</h2>
			</header>
			<form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault}>
				<div className={`modal__content ${contentClass}`}>{props.children}</div>
				<footer className={`modal__footer ${footerClass}`}>{footer}</footer>
			</form>
		</div>
	);

	return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
	const { show, onCancel } = props;

	return (
		<React.Fragment>
			{show && <Backdrop onClick={onCancel} />}
			<CSSTransition in={show} timeout={200} classNames="fade-in" mountOnEnter unmountOnExit>
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
