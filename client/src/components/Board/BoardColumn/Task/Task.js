import React, { useEffect, useState } from 'react';
import classes from './Task.module.css';
import { ReactComponent as Avatar } from './img/Avatar.svg';
import { ReactComponent as CloseEmpty } from './img/CloseEmpty.svg';

function Task({ date, text, id, onDelete }) {
	const [deadlineColor, setDeadlineColor] = useState(null);

	function dateRightEnding() {
		const exceptions = { 11: null, 12: null, 13: null, 14: null };
		if (date.days) {
			const deadline = date.days;
			if (deadline in exceptions) {
				return 'дней';
			} else if (deadline % 10 === 1) {
				return 'день';
			} else if (
				deadline % 10 === 2 ||
				deadline % 10 === 3 ||
				deadline % 10 === 4
			) {
				return 'дня';
			} else {
				return 'дней';
			}
		} else {
			const deadline = date.hours;
			if (deadline in exceptions) {
				return 'часов';
			} else if (deadline % 10 === 1) {
				return 'час';
			} else if (
				deadline % 10 === 2 ||
				deadline % 10 === 3 ||
				deadline % 10 === 4
			) {
				return 'часа';
			} else {
				return 'часов';
			}
		}
	}

	useEffect(() => {
		console.log(date.days);
		if (date.days >= 14) {
			setDeadlineColor('#0B6142');
		} else if (date.days >= 3) {
			setDeadlineColor('#E06D03');
		} else {
			setDeadlineColor('#DA1E28');
		}
	}, [date]);

	return (
		<div className={classes.Task}>
			<div className={classes.Header}>
				<span
					style={{
						color: deadlineColor,
					}}
				>
					{date.days ? date.days : date.hours} {dateRightEnding()} до окончания
					срока
				</span>
				<CloseEmpty
					className={classes.Close}
					onClick={() => {
						onDelete(id);
					}}
				/>
			</div>
			<div className={classes.Row}>
				<p>{text}</p>
				<Avatar className={classes.Icon} />
			</div>
		</div>
	);
}

export default Task;
