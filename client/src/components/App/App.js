import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Signup from '../../pages/Signup/Signup';
import Home from '../../pages/Home/Home';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/' element={<Navigate to='/login' />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</LocalizationProvider>
	);
}

export default App;
