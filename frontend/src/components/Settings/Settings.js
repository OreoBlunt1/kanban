import React, { useEffect, useState } from "react";
import Backdrop from "../UI/Backdrop/Backdrop";
import SettingItem from "./SettingItem/SettingItem";
import classes from "./Settings.module.css";
import { ReactComponent as CloseEmpty } from "./img/CloseEmpty.svg";

function Settings(props) {
	const [properties, setProperties] = useState({
		darkTheme: { text: "Темная тема", isOn: false },
		notifications: { text: "Уведомления", isOn: false },
		reminders: { text: "Напоминания", isOn: false },
	});

	const onToggleSettings = (propName) => {
		const newProperties = { ...properties };

		newProperties[propName].isOn = !newProperties[propName].isOn;
		setProperties(newProperties);
	};

	if (properties["darkTheme"].isOn) {
		//сделать потом темную тему и активировать ее здесь
	}

	const renderSettingItems = () => {
		return Object.keys(properties).map((propName, index) => {
			const prop = properties[propName];

			return (
				<SettingItem
					text={prop.text}
					isOn={prop.isOn}
					onToggle={onToggleSettings}
					name={propName}
					key={index}
				/>
			);
		});
	};

	useEffect(() => {
		function handleEscClose(event) {
			if (event.keyCode === 27) {
				props.onClose();
			}
		}

		document.addEventListener("keydown", handleEscClose);

		return () => {
			document.removeEventListener("keydown", handleEscClose);
		};
	}, [props]);

	return (
		<>
			<div className={classes.Settings}>
				<div className={classes.header}>
					<h1>Настройки</h1>
					<CloseEmpty className={classes.close} onClick={props.onClose} />
				</div>
				{renderSettingItems()}
			</div>
			<Backdrop onClick={props.onClose} />
		</>
	);
}

export default Settings;
