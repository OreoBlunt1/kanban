import React from 'react';
import classes from './Board.module.css';
import BoardColumn from './BoardColumn/BoardColumn';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function moveTask(columnId, taskId) {
	console.log('moved column #', columnId);
	console.log('moved task # ', taskId);
}

function Board() {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className={classes.Board}>
				<BoardColumn type={'В планах'} id={'1'} />
				<BoardColumn type={'В работе'} id={'2'} />
				<BoardColumn type={'Отложено'} id={'3'} />
				<BoardColumn type={'Готово'} id={'4'} />
			</div>
		</DndProvider>
	);
}

export default Board;
