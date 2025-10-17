import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './login.jsx';
import Dashboard from './dashboard.jsx';
import { Landing } from './landing.page.jsx';
import DashboardI from './dashboardinv.jsx';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<AuthForm />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard-inversor" element={<DashboardI />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
