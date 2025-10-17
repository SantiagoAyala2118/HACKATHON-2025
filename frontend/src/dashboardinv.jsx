import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardI() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [activeTab, setActiveTab] = useState('inicio');
	const [projects, setProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('todos');

	useEffect(() => {
		const userData = localStorage.getItem('user');
		if (userData) {
			setUser(JSON.parse(userData));
		} else {
			setUser({
				name: 'Carlos',
				email: 'inversor@empresa.com',
				joinDate: '2024-01-15',
				type: 'inversor',
				company: 'Capital Ventures',
				investmentFocus: 'Tecnología, Fintech',
			});
		}
	}, []);

	useEffect(() => {
		fetchProjects();
	}, []);

	useEffect(() => {
		filterProjects();
	}, [projects, searchTerm, selectedCategory]);

	const fetchProjects = async () => {
		try {
			const response = await fetch('/api/projects');
			const data = await response.json();
			setProjects(data);
		} catch (error) {
			console.error('Error al obtener proyectos:', error);
			// Datos de ejemplo para demo
			setProjects([
				{
					_id: '1',
					title: 'App de Gestión Financiera',
					description: 'Plataforma mobile-first para gestión personal de finanzas con IA',
					category: 'fintech',
					fundingGoal: 50000,
					currentFunding: 25000,
					entrepreneur: 'María González',
					createdAt: '2024-03-15',
					status: 'active',
				},
				{
					_id: '2',
					title: 'Marketplace Local Sostenible',
					description: 'E-commerce para productos locales y sostenibles',
					category: 'ecommerce',
					fundingGoal: 75000,
					currentFunding: 15000,
					entrepreneur: 'Javier Rodríguez',
					createdAt: '2024-03-10',
					status: 'active',
				},
				{
					_id: '3',
					title: 'Plataforma EdTech',
					description: 'Sistema de aprendizaje adaptativo para educación online',
					category: 'edtech',
					fundingGoal: 100000,
					currentFunding: 40000,
					entrepreneur: 'Ana Martínez',
					createdAt: '2024-03-05',
					status: 'active',
				},
			]);
		}
	};

	const filterProjects = () => {
		let filtered = projects.filter(
			(project) =>
				project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.entrepreneur.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		if (selectedCategory !== 'todos') {
			filtered = filtered.filter((project) => project.category === selectedCategory);
		}

		setFilteredProjects(filtered);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigate('/');
	};

	const handleInvestment = async (projectId, amount) => {
		try {
			const response = await fetch('/api/investments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					projectId,
					amount,
					investorId: user?.email,
				}),
			});

			if (response.ok) {
				alert('Inversión realizada exitosamente');
				fetchProjects(); // Refrescar datos
			}
		} catch (error) {
			console.error('Error al realizar inversión:', error);
			alert('Error al procesar la inversión');
		}
	};

	const stats = [
		{ title: 'Inversiones Activas', value: '8', color: 'green' },
		{ title: 'Monto Total Invertido', value: '$250K', color: 'blue' },
		{ title: 'ROI Promedio', value: '18%', color: 'orange' },
		{ title: 'Proyectos Exitosos', value: '12', color: 'red' },
	];

	const recentActivities = [
		{ action: 'Nuevo proyecto en tu categoría de interés', time: 'Hace 2 horas' },
		{ action: 'Actualización de proyecto "App Financiera"', time: 'Hace 1 día' },
		{ action: 'Retorno de inversión recibido', time: 'Hace 3 días' },
		{ action: 'Reunión con emprendedor confirmada', time: 'Hace 5 días' },
	];

	const categories = [
		{ value: 'todos', label: 'Todos los proyectos' },
		{ value: 'fintech', label: 'Fintech' },
		{ value: 'ecommerce', label: 'E-commerce' },
		{ value: 'edtech', label: 'EdTech' },
		{ value: 'healthtech', label: 'HealthTech' },
		{ value: 'sustainability', label: 'Sostenibilidad' },
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

	const getProgressPercentage = (current, goal) => {
		return Math.min((current / goal) * 100, 100);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-600 font-sans">
			{/* Header */}
			<header className="bg-white/95 backdrop-blur-lg py-5 px-10 flex justify-between items-center shadow-lg">
				<div className="header-left">
					<h1 className="text-2xl font-bold text-gray-800 m-0">Dashboard Inversor</h1>
					<p className="text-gray-600 mt-1 mb-0">
						Bienvenido{user ? `, ${user.name}` : ''}!
					</p>
				</div>
				<div className="flex items-center gap-5">
					<div className="flex items-center gap-2.5">
						<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
							{user?.name?.charAt(0) || 'I'}
						</div>
						<div className="flex flex-col">
							<strong className="text-gray-800">{user?.name || 'Inversor'}</strong>
							<small className="text-gray-600">
								{user?.company || 'Firma de Inversión'}
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
				{['inicio', 'proyectos', 'inversiones', 'perfil'].map((tab) => (
					<button
						key={tab}
						className={`bg-transparent border-none py-3.5 px-5 cursor-pointer text-base transition-all duration-300 border-b-2 border-transparent ${
							activeTab === tab
								? 'text-blue-500 border-b-blue-500 bg-blue-500/10'
								: 'text-gray-600 hover:text-gray-800 hover:bg-blue-500/10'
						}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab === 'inicio' && 'Inicio'}
						{tab === 'proyectos' && 'Descubrir Proyectos'}
						{tab === 'inversiones' && 'Mis Inversiones'}
						{tab === 'perfil' && 'Perfil'}
					</button>
				))}
			</nav>

			{/* Main Content */}
			<main className="p-10 min-h-[calc(100vh-200px)]">
				{/* Inicio Tab */}
				{activeTab === 'inicio' && (
					<div>
						<h2 className="text-white mb-5 text-2xl">Panel de Control</h2>

						{/* Stats Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
							{stats.map((stat, index) => (
								<div
									key={index}
									className={`bg-white/95 p-6 rounded-xl flex items-center gap-3.5 shadow-lg transition-transform duration-300 hover:-translate-y-1 border-l-4 ${getBorderColor(
										stat.color,
									)}`}
								>
									<div className="text-2xl">📈</div>
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

							{/* Portfolio Performance Card */}
							<div className="bg-white/95 p-6 rounded-xl shadow-lg">
								<h3 className="text-gray-800 mt-0 mb-3 border-b-2 border-gray-200 pb-2.5">
									Rendimiento de Portafolio
								</h3>
								<div className="flex flex-col gap-3.5">
									{[
										{ project: 'App Financiera', performance: '+25%' },
										{ project: 'Plataforma EdTech', performance: '+18%' },
										{ project: 'Marketplace Local', performance: '+12%' },
									].map((item, index) => (
										<div
											key={index}
											className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0"
										>
											<div>
												<p className="text-gray-800 m-0">{item.project}</p>
												<small className="text-gray-600">ROI desde inversión</small>
											</div>
											<span
												className={`font-bold ${
													item.performance.startsWith('+')
														? 'text-green-500'
														: 'text-red-500'
												}`}
											>
												{item.performance}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Proyectos Tab */}
				{activeTab === 'proyectos' && (
					<div>
						<div className="flex justify-between items-center mb-5">
							<h2 className="text-white text-2xl">Descubrir Proyectos</h2>
							<div className="flex gap-3">
								<input
									type="text"
									placeholder="Buscar proyectos..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									{categories.map((category) => (
										<option key={category.value} value={category.value}>
											{category.label}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProjects.map((project) => (
								<div
									key={project._id}
									className="bg-white/95 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1"
								>
									<div className="flex justify-between items-start mb-3">
										<h3 className="text-xl font-semibold text-gray-800 m-0">
											{project.title}
										</h3>
										<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
											{project.category}
										</span>
									</div>

									<p className="text-gray-600 mb-4">{project.description}</p>

									<div className="mb-4">
										<div className="flex justify-between text-sm text-gray-600 mb-1">
											<span>Emprendedor: {project.entrepreneur}</span>
										</div>
										<div className="flex justify-between text-sm text-gray-600 mb-2">
											<span>Meta: ${project.fundingGoal.toLocaleString()}</span>
											<span>Recaudado: ${project.currentFunding.toLocaleString()}</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className="bg-green-500 h-2 rounded-full transition-all duration-300"
												style={{
													width: `${getProgressPercentage(
														project.currentFunding,
														project.fundingGoal,
													)}%`,
												}}
											></div>
										</div>
										<div className="text-right text-xs text-gray-500 mt-1">
											{Math.round(
												getProgressPercentage(
													project.currentFunding,
													project.fundingGoal,
												),
											)}
											% completado
										</div>
									</div>

									<div className="flex gap-2">
										<button
											className="flex-1 bg-blue-500 text-white border-none py-2 px-3 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-blue-600"
											onClick={() => handleInvestment(project._id, 5000)}
										>
											Invertir
										</button>
										<button className="flex-1 bg-gray-500 text-white border-none py-2 px-3 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-gray-600">
											Contactar
										</button>
									</div>
								</div>
							))}
						</div>

						{filteredProjects.length === 0 && (
							<div className="bg-white/95 p-10 rounded-xl text-center text-gray-600">
								<p>No se encontraron proyectos que coincidan con tu búsqueda.</p>
							</div>
						)}
					</div>
				)}

				{/* Inversiones Tab */}
				{activeTab === 'inversiones' && (
					<div>
						<h2 className="text-white mb-5 text-2xl">Mis Inversiones</h2>
						<div className="bg-white/95 p-6 rounded-xl shadow-lg">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="text-left py-3 px-4">Proyecto</th>
											<th className="text-left py-3 px-4">Monto Invertido</th>
											<th className="text-left py-3 px-4">Fecha</th>
											<th className="text-left py-3 px-4">ROI</th>
											<th className="text-left py-3 px-4">Estado</th>
										</tr>
									</thead>
									<tbody>
										{[
											{
												project: 'App Financiera',
												amount: 25000,
												date: '15/02/2024',
												roi: '+25%',
												status: 'Activa',
											},
											{
												project: 'Plataforma EdTech',
												amount: 50000,
												date: '10/01/2024',
												roi: '+18%',
												status: 'Activa',
											},
											{
												project: 'Marketplace Local',
												amount: 15000,
												date: '05/03/2024',
												roi: '+12%',
												status: 'Activa',
											},
										].map((investment, index) => (
											<tr
												key={index}
												className="border-b border-gray-100 hover:bg-gray-50"
											>
												<td className="py-3 px-4 font-medium">{investment.project}</td>
												<td className="py-3 px-4">
													${investment.amount.toLocaleString()}
												</td>
												<td className="py-3 px-4">{investment.date}</td>
												<td
													className={`py-3 px-4 font-semibold ${
														investment.roi.startsWith('+')
															? 'text-green-500'
															: 'text-red-500'
													}`}
												>
													{investment.roi}
												</td>
												<td className="py-3 px-4">
													<span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
														{investment.status}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}

				{/* Perfil Tab */}
				{activeTab === 'perfil' && (
					<div>
						<h2 className="text-white mb-5 text-2xl">Mi Perfil de Inversor</h2>
						<div className="bg-white/95 p-7 rounded-xl shadow-lg">
							<div className="flex items-center gap-5 mb-6">
								<div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
									{user?.name?.charAt(0) || 'I'}
								</div>
								<div className="flex-1">
									<h3 className="text-2xl text-gray-800 m-0">
										{user?.name || 'Inversor'}
									</h3>
									<p className="text-gray-600 my-1 mx-0">
										{user?.email || 'inversor@empresa.com'}
									</p>
									<small className="text-gray-500">
										Miembro desde: {user?.joinDate || '2024'}
									</small>
								</div>
								<button className="bg-blue-500 text-white border-none py-2.5 px-5 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5">
									Editar Perfil
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="bg-gray-50 p-5 rounded-lg">
									<h4 className="text-lg font-semibold text-gray-800 mb-3">
										Información de la Firma
									</h4>
									<div className="space-y-2">
										<p>
											<strong>Empresa:</strong> {user?.company || 'No especificado'}
										</p>
										<p>
											<strong>Enfoque de Inversión:</strong>{' '}
											{user?.investmentFocus || 'No especificado'}
										</p>
										<p>
											<strong>Tipo de Inversor:</strong> {user?.type || 'Inversor'}
										</p>
									</div>
								</div>

								<div className="bg-gray-50 p-5 rounded-lg">
									<h4 className="text-lg font-semibold text-gray-800 mb-3">
										Preferencias
									</h4>
									<div className="space-y-2">
										<p>
											<strong>Ticket Promedio:</strong> $25,000 - $100,000
										</p>
										<p>
											<strong>Etapa Preferida:</strong> Early Stage
										</p>
										<p>
											<strong>Sectores:</strong> Tecnología, Fintech, SaaS
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</main>

			{/* Footer */}
			<footer className="bg-black/80 text-white text-center py-5 mt-auto">
				<p className="m-0">© 2025 fondeAr - Plataforma para Inversores</p>
			</footer>
		</div>
	);
}

export default DashboardI;
