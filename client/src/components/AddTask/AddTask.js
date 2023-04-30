import React, { useEffect, useState } from 'react';
import classes from './AddTask.module.css';
import { ReactComponent as CloseEmpty } from '../Settings/img/CloseEmpty.svg';
import Backdrop from '../UI/Backdrop/Backdrop';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import DateInput from '../UI/DateInput/DateInput';

function AddTask(props) {
	const [isFormValid, setIsFormValid] = useState(false);
	const [touched, setTouched] = useState(false);
	const [isTaskInvalid, setIsTaskInvalid] = useState(true);
	const [isDateInvalid, setIsDateInvalid] = useState(true);
	const [taskControls, setTaskControls] = useState({
		text: {
			value: '',
			type: 'text',
			label: 'Задача',
			placeholder: '',
		},
	});
	const [date, setDate] = useState(null);

	const onTaskChangeHandler = (event, controlName) => {
		const newTaskControls = { ...taskControls };
		const control = newTaskControls[controlName];

		control.value = event.target.value;
		newTaskControls[controlName] = control;

		setTaskControls(newTaskControls);
	};

	const onDateChangeHandler = (event) => {
		setDate(event.$d);
	};

	const onEnterPressedHandler = (event) => {
		if (event.key == 'Enter') {
			addNewTask();
		}
	};

	const renderInputs = () => {
		return Object.keys(taskControls).map((controlName, index) => {
			const control = taskControls[controlName];
			return (
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					label={control.label}
					placeholder={control.placeholder}
					onChange={(event) => {
						onTaskChangeHandler(event, controlName);
					}}
					onKeyDown={(event) => {
						onEnterPressedHandler(event);
					}}
				/>
			);
		});
	};

	function addNewTask() {
		if (isFormValid) {
			props.onAdd(taskControls, date);
			setIsDateInvalid(false);
			setIsTaskInvalid(false);
		} else {
			setTouched(true);
		}
	}

	useEffect(() => {
		function isValid() {
			if (taskControls.text.value === '') {
				setIsTaskInvalid(true);
			} else {
				setIsTaskInvalid(false);
			}
			if (date - Date.now() <= 0) {
				setIsDateInvalid(true);
			} else {
				setIsDateInvalid(false);
			}
			return !isDateInvalid && !isTaskInvalid;
		}

		setIsFormValid(isValid());
	}, [taskControls, date, isTaskInvalid, isDateInvalid]);

	useEffect(() => {
		function handleEscClose(event) {
			if (event.keyCode === 27) {
				props.onClose();
			}
		}

		document.addEventListener('keydown', handleEscClose);

		return () => {
			document.removeEventListener('keydown', handleEscClose);
		};
	}, [props]);

	return (
		<>
			<div className={classes.AddTask}>
				<div className={classes.Header}>
					<h1>Добавление задачи</h1>
					<CloseEmpty className={classes.Close} onClick={props.onClose} />
				</div>
				{renderInputs()}
				<DateInput
					onKeyDown={(event) => {
						onEnterPressedHandler(event);
					}}
					onDateChange={(event) => {
						onDateChangeHandler(event);
					}}
				/>
				<Button onClick={addNewTask}>Добавить задачу</Button>
				<div className={classes.Exceptions}>
					{isTaskInvalid && touched ? (
						<span>* Поле задачи не должно быть пустым</span>
					) : null}
					{isDateInvalid && touched ? (
						<span>* Дедлайн отсутствует либо уже прошел</span>
					) : null}
				</div>
			</div>
			<Backdrop onClick={props.onClose} />
		</>
	);
}

export default AddTask;
