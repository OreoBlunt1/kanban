import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { ReactComponent as MenuIcon } from "./img/Menu.svg";
import { ReactComponent as TimeIcon } from "./img/Time.svg";
import { ReactComponent as CalendarIcon } from "./img/Calendar.svg";
import { ReactComponent as EmailIcon } from "./img/Email.svg";
import { ReactComponent as AccountIcon } from "./img/Account.svg";
import { ReactComponent as SettingsIcon } from "./img/Settings.svg";
import Settings from "../Settings/Settings";

function Navbar() {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const toggleSettings = () => {
		setIsSettingsOpen((prev) => !prev);
	};

	return (
		<>
			<div className={classes.Navbar}>
				<MenuIcon className={classes.Icon} />
				<div className={classes.Menu}>
					<TimeIcon className={classes.Icon} />
					<CalendarIcon className={classes.Icon} />
					<EmailIcon className={classes.Icon} />
					<AccountIcon className={classes.Icon} />
					<SettingsIcon className={classes.Icon} onClick={toggleSettings} />
				</div>
			</div>
			{isSettingsOpen ? <Settings onClose={toggleSettings} /> : null}
		</>
	);
}

export default Navbar;
