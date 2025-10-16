import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Limpiar el token del localStorage
		localStorage.removeItem('token');
		// Redirigir al login
		navigate('/');
	};

	return (
		<div className="dashboard">
			<h1>Dashboard</h1>
			<p>¡Bienvenido! Has iniciado sesión correctamente.</p>
			<button onClick={handleLogout}>Cerrar Sesión</button>
		</div>
	);
}

export default Dashboard;
