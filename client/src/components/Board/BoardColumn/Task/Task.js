import React from 'react';
import classes from './Task.module.css';
import { ReactComponent as Avatar } from './img/Avatar.svg';

function Task(props) {
	return (
		<div className={classes.Task}>
			<span>{props.date} дней до окончания срока</span>
			<div className={classes.Row}>
				<p>{props.text}</p>
				<Avatar className={classes.Icon} />
			</div>
		</div>
	);
}

export default Task;
