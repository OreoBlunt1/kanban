import React from "react";
import classes from "./Toolbar.module.css";
import { ReactComponent as AddEmpty } from "./img/AddEmpty.svg";
import { ReactComponent as ChatButton } from "./img/ChatButton.svg";
import { ReactComponent as ChevronDown } from "./img/ChevronDown.svg";
import { ReactComponent as OtherButton } from "./img/OtherButton.svg";

function Toolbar() {
	return (
		<div className={classes.Toolbar}>
			<div className={classes.Header}>
				<span>Лобби №1</span>
				<ChevronDown className={classes.Icon} />
			</div>
			<div className={classes.Buttons}>
				<OtherButton className={classes.Icon} />
				<ChatButton className={classes.Icon} />
				<button className={classes.AddLobby}>
					Добавить лобби <AddEmpty className={classes.Icon} />
				</button>
			</div>
		</div>
	);
}

export default Toolbar;
