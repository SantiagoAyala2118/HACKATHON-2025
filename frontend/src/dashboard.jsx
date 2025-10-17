// dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [activeTab, setActiveTab] = useState('inicio');
	const [buttonadd, setButtonadd] = useState(false);
	const [newProjectTitle, setNewProjectTitle] = useState('');
	const [newProjectDesc, setNewProjectDesc] = useState('');
	const [projects, setProjects] = useState([]);

	useEffect(() => {
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

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await fetch('/api/projects');
			const data = await response.json();
			setProjects(data);
		} catch (error) {
			console.error('Error al obtener proyectos:', error);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigate('/');
	};

	const stats = [
		{ title: 'Inversores interesados', value: '12', color: 'green' },
		{ title: 'Inversores Activos', value: '5', color: 'blue' },
		{ title: 'casos concretados', value: '8', color: 'orange' },
		{ title: 'valoracion', value: '4,5/5', color: 'red' },
	];

	const recentActivities = [
		{ action: 'Un inversor vio tu perfil', time: 'Hace 2 horas' },
		{ action: 'Un inversor guardó tu proyecto', time: 'Hace 1 día' },
		{ action: 'Un inversor comentó en tu proyecto', time: 'Hace 2 días' },
		{ action: 'Un inversor compartió tu proyecto', time: 'Hace 3 días' },
	];

	const getBorderColor = (color) => {
		const colors = {
			green: 'border-l-green-500',
			blue: 'border-l-blue-500',
			orange: 'border-l-orange-500',
			red: 'border-l-red-500',
		};
		return colors[color] || 'border-l-gray-500';
	};

	const handleAddProject = async () => {
		if (!newProjectTitle) return;
		try {
			const response = await fetch('/api/projects', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: newProjectTitle,
					description: newProjectDesc,
					owner: user?.email,
				}),
			});
			const data = await response.json();
			setProjects([data, ...projects]);
			setNewProjectTitle('');
			setNewProjectDesc('');
			setButtonadd(false);
		} catch (error) {
			console.error('Error al crear proyecto:', error);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 font-sans">
			{/* Header */}
			<header className="bg-white/95 backdrop-blur-lg py-5 px-10 flex justify-between items-center shadow-lg">
				<div className="header-left">
					<h1 className="text-2xl font-bold text-gray-800 m-0">Mi Dashboard</h1>
					<p className="text-gray-600 mt-1 mb-0">
						Bienvenido{user ? `, ${user.name}` : ''}!
					</p>
				</div>
				<div className="flex items-center gap-5">
					<div className="flex items-center gap-2.5">
						<div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
							{user?.name?.charAt(0) || 'U'}
						</div>
						<div className="flex flex-col">
							<strong className="text-gray-800">{user?.name || 'Usuario'}</strong>
							<small className="text-gray-600">
								{user?.email || 'usuario@ejemplo.com'}
							</small>
						</div>
					</div>
					<button
						className="bg-red-500 text-white border-none py-2.5 px-5 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-red-600 hover:-translate-y-0.5"
						onClick={handleLogout}
					>
						Cerrar Sesión
					</button>
				</div>
			</header>

			{/* Navigation */}
			<nav className="bg-white/90 py-0 px-10 flex gap-2.5 border-b border-gray-200">
				{['inicio', 'metas', 'progreso', 'perfil'].map((tab) => (
					<button
						key={tab}
						className={`bg-transparent border-none py-3.5 px-5 cursor-pointer text-base transition-all duration-300 border-b-2 border-transparent ${
							activeTab === tab
								? 'text-indigo-500 border-b-indigo-500 bg-indigo-500/10'
								: 'text-gray-600 hover:text-gray-800 hover:bg-indigo-500/10'
						}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab === 'inicio' && 'Inicio'}
						{tab === 'metas' && 'inversores activos'}
						{tab === 'progreso' && 'proyectos'}
						{tab === 'perfil' && 'Perfil'}
					</button>
				))}
			</nav>

			{/* Main Content */}
			<main className="p-10 min-h-[calc(100vh-200px)]">
				{/* Inicio Tab */}
				{activeTab === 'inicio' && (
					<div>
						<h2 className="text-white mb-5 text-2xl">Emprendedores</h2>

						{/* Stats Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
							{stats.map((stat, index) => (
								<div
									key={index}
									className={`bg-white/95 p-6 rounded-xl flex items-center gap-3.5 shadow-lg transition-transform duration-300 hover:-translate-y-1 border-l-4 ${getBorderColor(
										stat.color,
									)}`}
								>
									<div className="text-2xl">📊</div>
									<div>
										<h3 className="text-2xl font-bold text-gray-800 m-0">{stat.value}</h3>
										<p className="text-gray-600 mt-1 mb-0">{stat.title}</p>
									</div>
								</div>
							))}
						</div>

						{/* Content Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
							{/* Activity Card */}
							<div className="bg-white/95 p-6 rounded-xl shadow-lg">
								<h3 className="text-gray-800 mt-0 mb-3 border-b-2 border-gray-200 pb-2.5">
									Actividad Reciente
								</h3>
								<div className="flex flex-col gap-3.5">
									{recentActivities.map((activity, index) => (
										<div
											key={index}
											className="flex items-center gap-3.5 py-2.5 border-b border-gray-100 last:border-b-0"
										>
											<span className="text-lg">🔔</span>
											<div>
												<p className="text-gray-800 font-medium m-0">{activity.action}</p>
												<small className="text-gray-600">{activity.time}</small>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Goals Card */}
							<div className="bg-white/95 p-6 rounded-xl shadow-lg">
								<h3 className="text-gray-800 mt-0 mb-3 border-b-2 border-gray-200 pb-2.5">
									Por concretarse
								</h3>
								<div className="flex flex-col gap-3.5">
									{[
										{ goal: 'Cierre de negocio con inversor X', progress: 75 },
										{ goal: 'Presentación a inversores', progress: 30 },
										{ goal: 'Proyecto entregado', progress: 100 },
									].map((item, index) => (
										<div
											key={index}
											className="flex items-center gap-3.5 py-2.5 border-b border-gray-100 last:border-b-0"
										>
											<div className="flex-1 bg-gray-200 rounded-lg h-2 overflow-hidden">
												<div
													className="bg-green-500 h-full rounded-lg transition-all duration-300"
													style={{ width: `${item.progress}%` }}
												></div>
											</div>
											<div className="min-w-0 flex-1">
												<p className="text-gray-800 m-0 truncate">{item.goal}</p>
												<small className="text-gray-600">
													{item.progress}% completado
												</small>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Inversores Activos Tab */}
				{activeTab === 'metas' && (
					<div>
						<h2 className="text-white mb-5 text-2xl">Inversores Activos</h2>
						<p className="text-white mb-5">Gestiona los inversores aquí.</p>
						<div className="bg-white/95 p-10 rounded-xl text-center text-gray-600">
							<p>Funcionalidad de inversores en desarrollo...</p>
						</div>
					</div>
				)}

				{/* Proyectos Tab */}
				{activeTab === 'progreso' && (
					<div>
						<h2 className="text-white mb-5 text-2xl">Mis proyectos</h2>
						<p className="text-white mb-5">Visualiza tus proyectos</p>
						<button
							className="bg-indigo-500 text-white border-none py-2.5 px-5 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-indigo-600 hover:-translate-y-0.5"
							onClick={() => setButtonadd(true)}
						>
							Crear nuevo proyecto
						</button>

						<div className="bg-white/95 p-10 rounded-xl text-center text-gray-600 mt-5">
							{buttonadd && (
								<div className="border border-gray-300 p-3 m-2.5 rounded-lg bg-white max-w-[480px] mx-auto">
									<input
										type="text"
										placeholder="Título del proyecto"
										value={newProjectTitle}
										onChange={(e) => setNewProjectTitle(e.target.value)}
										className="w-full p-2.5 mb-2 text-base rounded-lg border border-gray-300"
									/>
									<textarea
										placeholder="Describe tu proyecto..."
										value={newProjectDesc}
										onChange={(e) => setNewProjectDesc(e.target.value)}
										className="w-full min-h-[120px] p-2.5 text-sm rounded-lg border border-gray-300"
									/>
									<div className="flex gap-2 mt-2">
										<button
											className="bg-indigo-500 text-white border-none py-2 px-3 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-indigo-600 flex-1"
											onClick={handleAddProject}
										>
											Guardar
										</button>
										<button
											className="bg-gray-500 text-white border-none py-2 px-3 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-gray-600 flex-1"
											onClick={() => {
												setNewProjectTitle('');
												setNewProjectDesc('');
												setButtonadd(false);
											}}
										>
											Cancelar
										</button>
									</div>
								</div>
							)}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								{projects.map((project) => (
									<div
										key={project._id}
										className="bg-white/95 p-5 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1"
									>
										<h3 className="text-lg font-semibold text-gray-800 mb-2">
											{project.title}
										</h3>
										<p className="text-gray-600 text-sm mb-4">{project.description}</p>
										<div className="flex flex-wrap gap-2">
											<span className="text-xs bg-indigo-500 text-white rounded-full px-3 py-1">
												{project.owner}
											</span>
											<span className="text-xs bg-gray-200 text-gray-800 rounded-full px-3 py-1">
												{new Date(project.createdAt).toLocaleDateString()}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Perfil Tab */}
				{activeTab === 'perfil' && (
					<div>
						<h2 className="text-white mb-5 text-2xl">Mi Perfil</h2>
						<div className="bg-white/95 p-7 rounded-xl flex items-center gap-5 shadow-lg">
							<div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl">
								{user?.name?.charAt(0) || 'U'}
							</div>
							<div className="flex-1">
								<h3 className="text-2xl text-gray-800 m-0">{user?.name || 'Usuario'}</h3>
								<p className="text-gray-600 my-1 mx-0">
									{user?.email || 'usuario@ejemplo.com'}
								</p>
								<small className="text-gray-500">
									Miembro desde: {user?.joinDate || '2024'}
								</small>
							</div>
							<button className="bg-indigo-500 text-white border-none py-2.5 px-5 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-indigo-600 hover:-translate-y-0.5">
								Editar Perfil
							</button>
						</div>
					</div>
				)}
			</main>

			{/* Footer */}
			<footer className="bg-black/80 text-white text-center py-5 mt-auto">
				<p className="m-0">© 2025 fondeAr - Todos los derechos reservados</p>
			</footer>
		</div>
	);
}

export default Dashboard;
