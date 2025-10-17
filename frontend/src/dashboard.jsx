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
				name: 'Axel',
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
		{ title: 'Inversores interesados', value: '12', icon: '', color: 'green' },
		{ title: 'Inversores Activos', value: '5', icon: '', color: 'blue' },
		{ title: 'casos concretados', value: '8', icon: '', color: 'orange' },
		{ title: 'valoracion', value: '4,5/5', icon: '', color: 'red' },
	];

	const recentActivities = [
		{ action: 'Un inversor vio tu perfil', time: 'Hace 2 horas', icon: '' },
		{ action: 'Un inversor guardó tu proyecto', time: 'Hace 1 día', icon: '' },
		{ action: 'Un inversor comentó en tu proyecto', time: 'Hace 2 días', icon: '' },
		{ action: 'Un inversor compartió tu proyecto', time: 'Hace 3 días', icon: '' },
	];

	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<div className="header-left">
					<h1>Mi Dashboard</h1>
					<p>Bienvenido{user ? `, ${user.name}` : ''}!</p>
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
					proyectos
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
						<h2>Emprendedores</h2>

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
								<h3>Actividad Reciente</h3>
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
								<h3>Por concretarse </h3>
								<div className="goals-list">
									<div className="goal-item">
										<div className="goal-progress">
											<div className="progress-bar" style={{ width: '75%' }}></div>
										</div>
										<p>Cierre de negocio con inversor X</p>
										<small>75% completado</small>
									</div>
									<div className="goal-item">
										<div className="goal-progress">
											<div className="progress-bar" style={{ width: '30%' }}></div>
										</div>
										<p>Presentación a inversores</p>
										<small>30% completado</small>
									</div>
									<div className="goal-item">
										<div className="goal-progress">
											<div className="progress-bar" style={{ width: '100%' }}></div>
										</div>
										<p>Proyecto entregado</p>
										<small>100% completado</small>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Otras pestañas */}
				{activeTab === 'metas' && (
					<div className="tab-content">
						<h2>Inversores Activos</h2>
						<p>Gestiona los inversores aquí.</p>
						<div className="placeholder-content">
							<p> Funcionalidad de inversores en desarrollo...</p>
						</div>
					</div>
				)}

				{activeTab === 'progreso' && (
					<div className="tab-content">
						<h2> Mis proyectos</h2>
						<p>Visualiza tus proyectos </p>
						<div className="placeholder-content">
							<p> Funcionalidad de proyectos en desarrollo...</p>
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
				<p>© 2025 fondeAr - Todos los derechos reservados</p>
			</footer>
		</div>
	);
}

export default Dashboard;
