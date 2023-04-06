import React from "react";
import classes from "./Layout.module.css";

function Layout({ children }) {
	return (
		<div className={classes.Layout}>
			<main>{children}</main>
		</div>
	);
}

export default Layout;
