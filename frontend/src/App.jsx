import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './login.jsx';
import Dashboard from './dashboard.jsx';
import { Landing } from './landing.page.jsx';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
