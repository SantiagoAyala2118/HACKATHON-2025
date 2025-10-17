// dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo-fondeAr.png';

// Componente de Gráfico de Barras (ejemplo simple para simular el de la imagen)
const BarChartExample = () => {
    const projects = [
        { name: 'foMedi', count: 8, color: 'bg-green-700' },
        { name: 'sinFiltro', count: 12, color: 'bg-green-800' },
        { name: 'ElectroAhorro', count: 16, color: 'bg-amber-800' },
        { name: 'agoraLearn', count: 19, color: 'bg-orange-800' },
    ];

    const maxCount = 20;

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-end h-48 space-x-2 pt-8">
                
                <div className="flex flex-col justify-between h-full text-xs text-gray-500 pr-2 border-r border-gray-200">
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                </div>
                
                {/* Barras del Gráfico */}
                <div className="flex items-end h-full space-x-4 flex-grow">
                    {projects.map((project, index) => (
                        <div key={index} className="flex flex-col items-center justify-end h-full flex-grow group">
                            <div
                                className={`${project.color} w-full rounded-t-sm transition-all duration-500`}
                                style={{ height: `${(project.count / maxCount) * 100}%` }}
                            ></div>
                            <span className="text-xs mt-1 text-gray-600 truncate max-w-[60px]">{project.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <h3 className="text-lg font-semibold text-center mt-4 text-amber-900 border-t border-amber-900/20 pt-2">
                Proyectos Exitosos
            </h3>
        </div>
    );
};

// Botones con Borde Degradado (
const GradientButton = ({ text }) => (
    <button className="w-full px-1 py-1 my-3 text-gray-800 font-medium rounded-xl shadow-inner bg-white border-2 border-transparent transition-all duration-300
        bg-gradient-to-r from-emerald-900 via-amber-700 to-orange-900 p-[3px] hover:shadow-xl hover:scale-[1.02] active:scale-100">
        <span className="flex justify-center items-center w-full h-full bg-white rounded-lg p-1">
            {text}
        </span>
    </button>
);


function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [activeTab, setActiveTab] = useState('inicio');
	const [buttonadd, setButtonadd] = useState(false);

	const [newProjectTitle, setNewProjectTitle] = useState('');
	const [newProjectDesc, setNewProjectDesc] = useState('');

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
						<button className="edit-profile-btn" onClick={() => setButtonadd(true)}>
							Crear nuevo proyecto
						</button>
						<div className="placeholder-content">
							{buttonadd && (
								<div
									className="project-card"
									style={{
										border: '1px solid #ccc',
										padding: '12px',
										margin: '10px',
										borderRadius: '8px',
										backgroundColor: '#fff',
										maxWidth: '480px',
									}}
								>
									<input
										type="text"
										placeholder="Título del proyecto"
										value={newProjectTitle}
										onChange={(e) => setNewProjectTitle(e.target.value)}
										className="project-input"
										style={{
											width: '100%',
											padding: '10px',
											marginBottom: '8px',
											fontSize: '16px',
											borderRadius: '6px',
											border: '1px solid #ccc',
										}}
									/>
									<textarea
										placeholder="Describe tu proyecto..."
										value={newProjectDesc}
										onChange={(e) => setNewProjectDesc(e.target.value)}
										className="project-textarea"
										style={{
											width: '100%',
											minHeight: '120px',
											padding: '10px',
											fontSize: '15px',
											borderRadius: '6px',
											border: '1px solid #ccc',
										}}
									/>
									<div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
										<button
											className="edit-profile-btn"
											type="button"
											onClick={() => {
												console.log('Nuevo proyecto:', {
													title: newProjectTitle,
													description: newProjectDesc,
												});
												// limpiar / cerrar
												setNewProjectTitle('');
												setNewProjectDesc('');
												setButtonadd(false);
											}}
											style={{ padding: '8px 12px', borderRadius: '6px' }}
										>
											Guardar
										</button>
										<button
											className="edit-profile-btn"
											type="button"
											onClick={() => {
												setNewProjectTitle('');
												setNewProjectDesc('');
												setButtonadd(false);
											}}
											style={{ padding: '8px 12px', borderRadius: '6px' }}
										>
											Cancelar
										</button>
									</div>
								</div>
							)}
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