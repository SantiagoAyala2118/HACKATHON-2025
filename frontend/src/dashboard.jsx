// dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Crearemos este CSS después

function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [activeTab, setActiveTab] = useState('inicio');

	useEffect(() => {
		// api para depue
		const userData = localStorage.getItem('user');
		if (userData) {
			setUser(JSON.parse(userData));
		} else {
			setUser({
				name: 'Usuario',
				email: 'usuario@gmail.com',
				joinDate: '2024-01-15',
			});
		}
	}, []);

	const handleLogout = () => {
		// Limpiar datos de sesión
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		// Redirigir al login
		navigate('/');
	};

	const stats = [
		{ title: 'Tareas Completadas', value: '12', icon: '', color: 'green' },
		{ title: 'Metas Activas', value: '5', icon: '', color: 'blue' },
		{ title: 'Logros', value: '8', icon: '', color: 'orange' },
		{ title: 'Días Consecutivos', value: '15', icon: '', color: 'red' },
	];

	const recentActivities = [
		{ action: 'Completaste una tarea', time: 'Hace 2 horas', icon: '' },
		{ action: 'Agregaste nueva meta', time: 'Hace 1 día', icon: '' },
		{ action: 'Logro desbloqueado', time: 'Hace 2 días', icon: '' },
		{ action: 'Perfil actualizado', time: 'Hace 3 días', icon: '' },
	];

	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<div className="header-left">
					<h1>Mi Dashboard</h1>
					<p>Bienvenido de vuelta{user ? `, ${user.name}` : ''}!</p>
				</div>
				<div className="header-right">
					<div className="user-info">
						<span className="user-avatar"></span>
						<div className="user-details">
							<strong>{user?.name || 'Usuario'}</strong>
							<small>{user?.email || 'usuario@ejemplo.com'}</small>
						</div>
					</div>
					<button className="logout-btn" onClick={handleLogout}>
						Cerrar Sesión
					</button>
				</div>
			</header>

			<nav className="dashboard-nav">
				<button
					className={`nav-btn ${activeTab === 'inicio' ? 'active' : ''}`}
					onClick={() => setActiveTab('inicio')}
				>
					Inicio
				</button>
				<button
					className={`nav-btn ${activeTab === 'metas' ? 'active' : ''}`}
					onClick={() => setActiveTab('metas')}
				>
					inversores activos
				</button>
				<button
					className={`nav-btn ${activeTab === 'progreso' ? 'active' : ''}`}
					onClick={() => setActiveTab('progreso')}
				>
					mis proyectos
				</button>
				<button
					className={`nav-btn ${activeTab === 'perfil' ? 'active' : ''}`}
					onClick={() => setActiveTab('perfil')}
				>
					Perfil
				</button>
			</nav>

			<main className="dashboard-main">
				{activeTab === 'inicio' && (
					<div className="tab-content">
						<h2>Resumen General</h2>

						<div className="stats-grid">
							{stats.map((stat, index) => (
								<div key={index} className={`stat-card ${stat.color}`}>
									<div className="stat-icon">{stat.icon}</div>
									<div className="stat-info">
										<h3>{stat.value}</h3>
										<p>{stat.title}</p>
									</div>
								</div>
							))}
						</div>

						<div className="content-grid">
							<div className="activity-card">
								<h3> Actividad Reciente</h3>
								<div className="activity-list">
									{recentActivities.map((activity, index) => (
										<div key={index} className="activity-item">
											<span className="activity-icon">{activity.icon}</span>
											<div className="activity-details">
												<p>{activity.action}</p>
												<small>{activity.time}</small>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Metas Próximas */}
							<div className="goals-card">
								<h3>Metas Próximas</h3>
								<div className="goals-list">
									<div className="goal-item">
										<div className="goal-progress">
											<div className="progress-bar" style={{ width: '75%' }}></div>
										</div>
										<p>Completar curso de React</p>
										<small>75% completado</small>
									</div>
									<div className="goal-item">
										<div className="goal-progress">
											<div className="progress-bar" style={{ width: '30%' }}></div>
										</div>
										<p>Leer 10 libros este año</p>
										<small>30% completado</small>
									</div>
									<div className="goal-item">
										<div className="goal-progress">
											<div className="progress-bar" style={{ width: '90%' }}></div>
										</div>
										<p>Rutina de ejercicio semanal</p>
										<small>90% completado</small>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Otras pestañas */}
				{activeTab === 'metas' && (
					<div className="tab-content">
						<h2>Mis Metas</h2>
						<p>Gestiona todas tus metas y objetivos aquí.</p>
						<div className="placeholder-content">
							<p> Funcionalidad de metas en desarrollo...</p>
						</div>
					</div>
				)}

				{activeTab === 'progreso' && (
					<div className="tab-content">
						<h2> Mi Progreso</h2>
						<p>Visualiza tu progreso y estadísticas.</p>
						<div className="placeholder-content">
							<p> Gráficos y estadísticas en desarrollo...</p>
						</div>
					</div>
				)}

				{activeTab === 'perfil' && (
					<div className="tab-content">
						<h2>Mi Perfil</h2>
						<div className="profile-card">
							<div className="profile-avatar"></div>
							<div className="profile-info">
								<h3>{user?.name || 'Usuario'}</h3>
								<p>{user?.email || 'usuario@ejemplo.com'}</p>
								<small>Miembro desde: {user?.joinDate || '2024'}</small>
							</div>
							<button className="edit-profile-btn"> Editar Perfil</button>
						</div>
					</div>
				)}
			</main>

			{/* Footer */}
			<footer className="dashboard-footer">
				<p>© 2024 Mi App - Todos los derechos reservados</p>
			</footer>
		</div>
	);
}

export default Dashboard;
