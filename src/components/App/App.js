import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "../../hoc/Layout/Layout";
import Auth from "../Auth/Auth";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Auth />} />
			</Routes>
		</Layout>
	);
}

export default App;
