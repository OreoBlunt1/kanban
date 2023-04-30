import React, { useState } from 'react';
import classes from './Input.module.css';
import { ReactComponent as EyeIcon } from './EyeOff.svg';

function isInvalid({ valid, touched, shouldValidate }) {
	return !valid && shouldValidate && touched;
}

function Input(props) {
	let inputType = props.type || 'text';
	const [showPassword, setShowPassword] = useState(false);
	const cls = [classes.Input];

	if (isInvalid(props)) {
		cls.push(classes.invalid);
	}

	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	if (showPassword) {
		inputType = 'text';
	}

	return (
		<div className={cls.join(' ')}>
			<h2>{props.label}</h2>
			<input
				placeholder={props.placeholder}
				type={inputType}
				value={props.value}
				onChange={props.onChange}
				onKeyDown={props.onKeyDown}
			/>
			{props.type === 'password' ? (
				<button tabIndex={-1} onClick={toggleShowPassword}>
					<EyeIcon></EyeIcon>
				</button>
			) : null}
			{isInvalid(props) ? (
				<span>{props.errorMessage || 'Unknown error'}</span>
			) : null}
		</div>
	);
}

export default Input;
