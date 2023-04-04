import React from "react";
import classes from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Toolbar from "../../components/Toolbar/Toolbar";
import Board from "../../components/Board/Board";

function Home() {
	return (
		<div className={classes.Home}>
			<div className={classes.container}>
				<Navbar></Navbar>
			</div>
			<div className={classes.container}>
				<Toolbar></Toolbar>
			</div>
			<div className={classes.container}>
				<Board />
			</div>
		</div>
	);
}

export default Home;
