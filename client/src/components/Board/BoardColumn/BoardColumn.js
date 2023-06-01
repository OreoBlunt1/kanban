import React, { useState } from 'react';
import AddTask from '../../AddTask/AddTask';
import classes from './BoardColumn.module.css';
import { ReactComponent as AddEmpty } from './img/AddEmpty.svg';
import { ReactComponent as MoreHorizontal } from './img/MoreHorizontal.svg';
import Task from './Task/Task';
import { moveTask } from '../Board';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';

function BoardColumn(props) {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'task',
		drop: (item) => moveTask(props.id, item.id),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));
	const [isAddTask, setIsAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);

	const addTask = (taskControls, date) => {
		setTasks(
			update(tasks, {
				$push: [
					{
						id: tasks.length,
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
					id={task.id}
					tasks={tasks}
					onDelete={deleteTask}
				/>
			);
		});
	}

	return (
		<div ref={drop} className={classes.wrapper}>
			<div className={classes.BoardColumn}>
				<div className={classes.Header}>
					<span>{props.type}</span>
					<div className={classes.TaskIcon}>
						<AddEmpty className={classes.Icon} onClick={toggleAddTask} />
						<MoreHorizontal className={classes.Icon} />
					</div>
				</div>
				{tasks.length !== 0 ? (
					<div className={classes.TaskContent}>
						{renderTasks()}{' '}
						{isOver ? (
							<div
								style={{
									background: 'rgba(54, 93, 255, .7)',
									height: '76px',
									borderRadius: '12px',
									padding: '8px',
								}}
							/>
						) : null}
					</div>
				) : isOver && isOver ? (
					<div
						style={{
							background: 'rgba(54, 93, 255, .4)',
							borderRadius: '12px',
							padding: '8px',
							marginTop: '17px',
							height: '100%',
						}}
					/>
				) : null}
			</div>
			{isAddTask ? <AddTask onClose={toggleAddTask} onAdd={addTask} /> : null}
		</div>
	);
}

export default BoardColumn;
