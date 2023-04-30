import React, { useState } from 'react';
import AddTask from '../../AddTask/AddTask';
import classes from './BoardColumn.module.css';
import { ReactComponent as AddEmpty } from './img/AddEmpty.svg';
import { ReactComponent as MoreHorizontal } from './img/MoreHorizontal.svg';
import Task from './Task/Task';
import update from 'immutability-helper';

function BoardColumn(props) {
	const [isAddTask, setIsAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);

	const addTask = (taskControls, date) => {
		setTasks(
			update(tasks, {
				$push: [
					{
						text: taskControls['text'].value,
						date: dateDiff(date),
					},
				],
			})
		);
	};

	function deleteTask(index) {
		setTasks(
			update(tasks, {
				$splice: [[index, 1]],
			})
		);
		console.log(typeof index);
	}

	function dateDiff(date) {
		const currentDate = new Date();
		const dateDiff = date - currentDate;
		const days = Math.round(dateDiff / 86400000);

		if (days === 0) {
			const hours = Math.round(dateDiff / 3600000);
			return { hours: hours };
		}

		return { days: days };
	}

	function toggleAddTask() {
		setIsAddTask((prev) => !prev);
	}

	function renderTasks() {
		return tasks.map((task, index) => {
			return (
				<Task
					text={task['text']}
					date={task['date']}
					key={index}
					id={index}
					tasks={tasks}
					onDelete={deleteTask}
				/>
			);
		});
	}

	return (
		<>
			<div className={classes.BoardColumn}>
				<div className={classes.Header}>
					<span>{props.type}</span>
					<div className={classes.TaskIcon}>
						<AddEmpty className={classes.Icon} onClick={toggleAddTask} />
						<MoreHorizontal className={classes.Icon} />
					</div>
				</div>
				{tasks.length !== 0 ? (
					<div className={classes.TaskContent}>{renderTasks()}</div>
				) : null}
			</div>
			{isAddTask ? <AddTask onClose={toggleAddTask} onAdd={addTask} /> : null}
		</>
	);
}

export default BoardColumn;
