import React from "react";
import Toggle from "../../UI/Toggle/Toggle";
import classes from "./SettingItem.module.css";

function SettingItem(props) {
	return (
		<div className={classes.SettingItem}>
			<span>{props.text}</span>
			<Toggle isOn={props.isOn} onToggle={props.onToggle} name={props.name} />
		</div>
	);
}

export default SettingItem;
