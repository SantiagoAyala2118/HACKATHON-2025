import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const handleDireccion = () => {
	window.location.href = '/login'; // Redirige a la página de login
};

export const Landing = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate('');
	};
	const testimonials = [
		{
			id: 1,
			name: 'usuario1',
			role: 'Usuario Premium',
			comment: 'gracias a esta app pude encontrar inversionistas facilmente.',
			avatar: '',
		},
		{
			id: 2,
			name: 'usuario2',
			role: 'Emprendedor',
			comment: 'gracias a esta app pude conseguir fondos para mi startup.',
			avatar: '',
		},
		{
			id: 3,
			name: 'usuario3',
			role: 'inversor',
			comment:
				'Simple, rapido y eficiente. Una buena plataforma para encontrar proyectos prometedores.',
			avatar: '',
		},
	];

	// Datos para el gráfico (simulado)
	const chartData = [
		{ month: 'Ene', value: 65 },
		{ month: 'Feb', value: 78 },
		{ month: 'Mar', value: 90 },
		{ month: 'Abr', value: 81 },
		{ month: 'May', value: 56 },
		{ month: 'Jun', value: 55 },
		{ month: 'Jul', value: 40 },
	];

	const maxValue = Math.max(...chartData.map((item) => item.value));

	return (
		<div className="landing-page">
			{/* Header */}
			<header className="landing-header">
				<div className="header-content">
					<div className="logo-section">
						<div className="logo"></div>
						<span className="logo-text">FondApp</span>
					</div>
					<button className="login-btn" onClick={handleDireccion}>
						Iniciar Sesión
					</button>
				</div>
			</header>

			{/* Hero Section */}
			<section className="hero-section">
				<div className="hero-content">
					{/* Columna Izquierda */}
					<div className="left-column">
						{/* Logo Cuadrado */}
						<div className="logo-square">
							<div className="logo-icon"></div>
							<h2>FondApp</h2>
							<p>Tu éxito, nuestra misión</p>
						</div>

						{/* Descripción de la Problemática */}
						<div className="problem-description">
							<h3>Descripción del Problema</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
								veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat.
							</p>
							<p>
								Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
								proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</div>

						{/* Opiniones */}
						<div className="testimonials-section">
							<h3>Lo que dicen nuestros usuarios</h3>
							<div className="testimonials-grid">
								{testimonials.map((testimonial) => (
									<div key={testimonial.id} className="testimonial-card">
										<div className="testimonial-header">
											<div className="testimonial-avatar">{testimonial.avatar}</div>
											<div className="testimonial-info">
												<h4>{testimonial.name}</h4>
												<p>{testimonial.role}</p>
											</div>
										</div>
										<p className="testimonial-comment">"{testimonial.comment}"</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Columna Derecha - Gráfico */}
					<div className="right-column">
						<div className="chart-container">
							<h3>Nuestro Impacto en Números</h3>
							<p>Progreso de usuarios en los últimos meses</p>

							<div className="chart">
								{chartData.map((item, index) => (
									<div key={index} className="chart-bar-container">
										<div
											className="chart-bar"
											style={{
												height: `${(item.value / maxValue) * 100}%`,
												animationDelay: `${index * 0.1}s`,
											}}
										>
											<span className="bar-value">{item.value}%</span>
										</div>
										<span className="bar-label">{item.month}</span>
									</div>
								))}
							</div>

							<div className="chart-stats">
								<div className="stat-item">
									<span className="stat-number">+15K</span>
									<span className="stat-label">Usuarios activos</span>
								</div>
								<div className="stat-item">
									<span className="stat-number">95%</span>
									<span className="stat-label">Satisfacción</span>
								</div>
								<div className="stat-item">
									<span className="stat-number">+200%</span>
									<span className="stat-label">Crecimiento</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Características */}
			<section className="features-section">
				<div className="features-content">
					<h2>¿Por qué elegir FondApp?</h2>
					<div className="features-grid">
						<div className="feature-card">
							<div className="feature-icon"></div>
							<h3>Rápido y intuitivo</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
								tempor.
							</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon"></div>
							<h3>Buena comunicacion</h3>
							<p>
								Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore.
							</p>
						</div>
						<div className="feature-card">
							<div className="feature-icon"></div>
							<h3>Seguro y Confiable</h3>
							<p>
								Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
