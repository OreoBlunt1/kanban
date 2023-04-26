import React, { useState } from 'react';
import classes from './Signup.module.css';
import Input from '../../components/UI/Input/Input';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';

function Signup() {
	const [isFormValid, setIsFormValid] = useState(false);
	const [formControls, setFormConstols] = useState({
		username: {
			value: '',
			type: 'username',
			label: 'Имя пользователя',
			errorMessage: 'Имя пользователя не должно содержать пробелов',
			placeholder: 'sasuke',
			valid: false,
			touched: false,
			validation: {
				required: true,
				spaces: true,
			},
		},
		email: {
			value: '',
			type: 'email',
			label: 'Адрес электронной почты',
			errorMessage: 'Введите правильный email',
			placeholder: 'blin@blinskiy.com',
			valid: false,
			touched: false,
			validation: {
				required: true,
				email: true,
			},
		},
		password: {
			value: '',
			type: 'password',
			label: 'Пароль',
			placeholder: '••••••••••',
			errorMessage: 'Минимальная длина пароля 8 символов',
			valid: false,
			touched: false,
			validation: {
				required: true,
				minLength: 8,
			},
		},
		checkPassword: {
			value: '',
			type: 'password',
			label: 'Повторите пароль',
			placeholder: '••••••••••',
			errorMessage: 'Пароли не совпадают',
			valid: false,
			touched: false,
			validation: {
				required: true,
				isEqualCheck: true,
			},
		},
	});

	const navigate = useNavigate();

	const validateEmail = (value) => {
		return String(value)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const validateControl = (value, validation) => {
		if (!validation) {
			return true;
		}

		let isValid = true;

		if (validation.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (validation.email) {
			isValid = validateEmail(value) && isValid;
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid;
		}

		if (validation.isEqualCheck) {
			isValid = value === formControls['password'].value && isValid;
		}

		if (validation.spaces) {
			isValid = value.replace(' ', '') === value.trim() && isValid;
		}

		return isValid;
	};

	const isPassEqual = (value) => {
		return value === formControls['checkPassword'].value;
	};

	const onChangeHandler = (event, controlName) => {
		const newFormControls = { ...formControls };
		const control = newFormControls[controlName];

		control.value = event.target.value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);

		const checkPass = newFormControls['checkPassword'];

		if (controlName === 'password') {
			checkPass.valid = isPassEqual(control.value);
		}

		newFormControls[controlName] = control;

		let newIsFormValid = true;

		Object.keys(newFormControls).forEach((name) => {
			newIsFormValid = newFormControls[name].valid && newIsFormValid;
		});

		setFormConstols(newFormControls);
		setIsFormValid(newIsFormValid);
	};

	const renderInputs = () => {
		return Object.keys(formControls).map((controlName, index) => {
			const control = formControls[controlName];
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					touched={control.touched}
					valid={control.valid}
					label={control.label}
					placeholder={control.placeholder}
					errorMessage={control.errorMessage}
					shouldValidate={!!control.validation}
					onChange={(event) => {
						onChangeHandler(event, controlName);
					}}
					onKeyDown={(event) => {
						onEnterPressedHandler(event);
					}}
				/>
			);
		});
	};

	const submitHandler = (event) => {
		event.preventDefault();
	};

	const onEnterPressedHandler = (event) => {
		if (event.key === 'Enter') {
			if (isFormValid) {
				navigate('/home');
			}
		}
	};

	const useGoHome = () => {
		if (isFormValid) {
			navigate('/home');
		}
	};

	const registerUser = () => {};

	return (
		<div className={classes.Signup}>
			<div className={classes.container}>
				<form className={classes.authForm} onSubmit={submitHandler}>
					<h1>Регистрация пользователя</h1>
					<p>
						Есть аккаунт? <NavLink to='/login'>Войдите</NavLink>
					</p>
					<hr />
					{renderInputs()}
					<Button onClick={useGoHome}>Зарегистрироваться</Button>
				</form>
			</div>
		</div>
	);
}

export default Signup;
