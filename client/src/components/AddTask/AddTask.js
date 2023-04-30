import React, { useEffect, useState } from 'react';
import classes from './AddTask.module.css';
import { ReactComponent as CloseEmpty } from '../Settings/img/CloseEmpty.svg';
import Backdrop from '../UI/Backdrop/Backdrop';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import DateInput from '../UI/DateInput/DateInput';

function AddTask(props) {
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
					shouldValidate={!!control.validation}
					onChange={(event) => {
						onTaskChangeHandler(event, controlName);
					}}
				/>
			);
		});
	};

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
					onDateChange={(event) => {
						onDateChangeHandler(event);
					}}
				/>
				<Button
					onClick={() => {
						props.onAdd(taskControls, date);
						console.log();
					}}
				>
					Добавить задачу
				</Button>
			</div>
			<Backdrop onClick={props.onClose} />
		</>
	);
}

export default AddTask;
