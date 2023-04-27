import React, { useState } from 'react';
import classes from './Login.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

function Auth() {
	const navigate = useNavigate();
	const [isFormValid, setIsFormValid] = useState(false);
	const [formControls, setFormConstols] = useState({
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
	});

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

		return isValid;
	};

	const onChangeHandler = (event, controlName) => {
		const newFormControls = { ...formControls };
		const control = newFormControls[controlName];

		control.value = event.target.value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);

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

	const onEnterPressedHandler = (event) => {
		if (event.key === 'Enter') {
			if (isFormValid) {
				navigate('/home');
			}
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();
	};

	const useGoHome = () => {
		console.log('sksdk');
		if (isFormValid) {
			navigate('/home');
		}
	};

	return (
		<div className={classes.Login}>
			<div className={classes.container}>
				<form className={classes.authForm} onSubmit={submitHandler}>
					<h1>Вход в приложение</h1>
					<p>
						Нет аккаунта? <NavLink to={'/signup'}>Зарегистрируйтесь</NavLink>
					</p>
					<hr />
					{renderInputs()}
					<Button onClick={useGoHome}>Войти</Button>
				</form>
			</div>
		</div>
	);
}

export default Auth;
