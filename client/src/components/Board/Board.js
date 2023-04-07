import React from "react";
import classes from "./Board.module.css";
import BoardColumn from "./BoardColumn/BoardColumn";

function Board() {
	return (
		<div className={classes.Board}>
			<BoardColumn type={"В планах"} />
			<BoardColumn type={"В работе"} />
			<BoardColumn type={"Отложено"} />
			<BoardColumn type={"Готово"} />
		</div>
	);
}

export default Board;
