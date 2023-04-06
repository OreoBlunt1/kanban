import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../../hoc/Layout/Layout";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Home from "../../pages/Home/Home";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/' element={<Navigate to='/login' />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</Layout>
	);
}

export default App;
