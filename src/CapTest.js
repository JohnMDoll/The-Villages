import './App.css';
import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from './views/ApplicationViews';
import { Login } from './login/Login';
import { NavBar } from './nav/GoodNavBar';
import { Authorized } from './views/Authorized';

export const CapTest = () => {
  return <Routes>
		<Route path="/login" element={<Login />} />
		{/* <Route path="/register" element={<Register />} /> */}

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}
