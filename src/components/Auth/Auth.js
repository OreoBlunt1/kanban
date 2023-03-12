import React from "react";
import classes from "./Auth.module.css";

function Auth() {
	return (
		<div className={classes.Auth}>
			<div className={classes.container}>
				<form className={classes.authForm} onsubmit='return false;'>
					<h1>Вход в приложение</h1>
					<p>
						Нет аккаунта? <a href='reg.html'>Зарегистрируйтесь</a>
					</p>
					<hr />
					<div className={classes.input}>
						<h2>Адрес электронной почты</h2>
						<input placeholder='suka@blyat.com' />
					</div>
					<div className={classes.input}>
						<h2>Пароль</h2>
						<input type='password' placeholder='••••••••••' />
					</div>
					<button onclick='goLobby()'>Войти</button>
				</form>
			</div>
		</div>
	);
}

export default Auth;
