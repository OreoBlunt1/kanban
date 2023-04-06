import React, { useState } from "react";
import classes from "./Task.module.css";
import { ReactComponent as Avatar } from "./img/Avatar.svg";
import update from "immutability-helper";

function Task(props) {
	const [isDragging, setIsDragging] = useState(false);
	const [dragIndex, setDragIndex] = useState(null);
	const [hoverIndex, setHoverIndex] = useState(null);

	const handleDragStart = (e, index) => {
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/html", e.target);
		setIsDragging(true);
		setDragIndex(index);
	};

	const handleDragEnter = (e, index) => {
		setHoverIndex(index);
	};

	const handleDragEnd = () => {
		setIsDragging(false);
		setDragIndex(null);
		setHoverIndex(null);
	};

	const handleDrop = () => {
		console.log("aslkfja");
		const tasks = update(props.tasks, {
			$splice: [
				[dragIndex, 1],
				[hoverIndex, 0, props.tasks[dragIndex]],
			],
		});
		props.updateTasks(tasks);
	};

	return (
		<div
			draggable
			onDragStart={(e) => handleDragStart(e, props.index)}
			onDragEnter={(e) => handleDragEnter(e, props.index)}
			onDragEnd={handleDragEnd}
			onDrop={handleDrop}
			className={classes.Task}
		>
			<span>{props.date} дней до окончания срока</span>
			<div className={classes.Row}>
				<p>{props.text}</p>
				<Avatar className={classes.Icon} />
			</div>
		</div>
	);
}

export default Task;
