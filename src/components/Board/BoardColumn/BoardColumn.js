import React, { useState } from "react";
import AddTask from "../../AddTask/AddTask";
import classes from "./BoardColumn.module.css";
import { ReactComponent as AddEmpty } from "./img/AddEmpty.svg";
import { ReactComponent as MoreHorizontal } from "./img/MoreHorizontal.svg";
import Task from "./Task/Task";
import update from "immutability-helper";

function BoardColumn(props) {
	const [isAddTask, setIsAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);

	const addTask = (taskControls) => {
		setTasks(
			update(tasks, {
				$push: [
					{
						text: taskControls["text"].value,
						date: taskControls["date"].value,
					},
				],
			})
		);
	};

	function toggleAddTask() {
		setIsAddTask((prev) => !prev);
	}

	const updateTasks = (newTasks) => {
		console.log("updateTasks");
		setTasks(newTasks);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const dragIndex = e.dataTransfer.getData("dragIndex");
		console.log(dragIndex);
		const hoverIndex = tasks.length; // drop to the end of the column
		const dragTask = tasks[dragIndex];

		if (dragIndex === hoverIndex) {
			return;
		}

		console.log(dragIndex);

		const newTasks = update(tasks, {
			$push: [
				{
					text: tasks[dragIndex].text,
					date: tasks[dragIndex].date,
				},
			],
		});

		console.log(newTasks);

		setTasks(newTasks);
	};

	function renderTasks() {
		return tasks.map((task, index) => {
			return (
				<Task
					text={task["text"]}
					date={task["date"]}
					key={index}
					index={index}
					tasks={tasks}
					updateTasks={updateTasks}
				/>
			);
		});
	}

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<div
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				className={classes.BoardColumn}
			>
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
