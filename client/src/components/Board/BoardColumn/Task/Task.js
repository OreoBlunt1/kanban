import React from 'react';
import classes from './Task.module.css';
import { ReactComponent as Avatar } from './img/Avatar.svg';

function Task({ date, text }) {
	function dayRightEnding() {
		const exceptions = { 11: null, 12: null, 13: null, 14: null };

		if (date in exceptions) {
			return 'дней';
		} else if (date % 10 === 1) {
			return 'день';
		} else if (date % 10 === 2 || date % 10 === 3 || date % 10 === 4) {
			return 'дня';
		} else {
			return 'дней';
		}
	}

	return (
		<div className={classes.Task}>
			<span>
				{date} {dayRightEnding()} до окончания срока
			</span>
			<div className={classes.Row}>
				<p>{text}</p>
				<Avatar className={classes.Icon} />
			</div>
		</div>
	);
}

export default Task;
