import React, { useState } from "react";
import styles from "./Toggle.module.css";

const Toggle = (props) => {
	const [isOn, setIsOn] = useState(props.isOn);

	const handleClick = () => {
		setIsOn(!isOn);
		props.onToggle(props.name);
	};

	return (
		<div
			className={isOn ? `${styles.toggle} ${styles.on}` : styles.toggle}
			onClick={handleClick}
		>
			<div className={styles.switch}></div>
		</div>
	);
};

export default Toggle;
