import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
	const [isLoginView, setIsLoginView] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [msg, setMsg] = useState('');
	const [loading, setLoading] = useState(false);

	const [selectedOption, setSelectedOption] = useState('opcion1');
	const handleToggle = () => {
		setSelectedOption((prev) => (prev === 'opcion1' ? 'opcion2' : 'opcion1'));
	};

	// Usa useNavigate en lugar de window.location.href
	const navigate = useNavigate();

	const toggleView = () => {
		setIsLoginView(!isLoginView);
		setName('');
		setEmail('');
		setPassword('');
		setMsg('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setMsg('');

		try {
			if (isLoginView) {
				// Lógica de Login
				const loginData = {
					email: email,
					password: password,
				};

				console.log('Objeto de Login:', loginData);

				const response = await fetch('http://localhost:3000/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginData),
				});

				const data = await response.json();

				if (response.ok) {
					setMsg(' ¡Login exitoso! Redirigiendo...');
					console.log('Respuesta del servidor:', data);

					// Guardar el token en localStorage si viene en la respuesta
					if (data.token) {
						localStorage.setItem('token', data.token);
					}

					// Redirigir usando navigate
					setTimeout(() => {
						navigate('/dashboard');
					}, 1500);
				} else {
					setMsg(`Error: ${data.msg || 'Credenciales incorrectas'}`);
				}
			} else {
				// Lógica de Registro
				const userData = {
					email: email,
					password: password,
					nombre_completo: name,
				};

				console.log('Objeto de Registro:', userData);

				const response = await fetch('http://localhost:3000/api/auth/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				});

				const data = await response.json();

				if (response.ok) {
					setMsg(' ¡Usuario registrado exitosamente!');
					console.log('Respuesta del servidor:', data);
					setTimeout(() => setIsLoginView(true), 2000);
				} else {
					setMsg(` Error: ${data.msg || 'Error en el registro'}`);
				}
			}
		} catch (error) {
			console.error('Error en la petición:', error);
			setMsg(' Error de conexión con el servidor');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>{isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
				{msg && (
					<div className={`msg ${msg.includes('✅') ? 'success' : 'error'}`}>{msg}</div>
				)}
				{!isLoginView && (
					<div className="input-group">
						<select
							id="selectOption"
							className="auth-input"
							value={selectedOption}
							onChange={(e) => setSelectedOption(e.target.value)}
							disabled={loading}
						>
							<option value="opcion1">Seleccione un rol</option>
							<option value="opcion2">Inversor</option>
							<option value="opcion3">Emprendedor</option>
						</select>
					</div>
				)}
				{!isLoginView && (
					<>
						<div className="input-group">
							<label htmlFor="name">Nombre</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								disabled={loading}
							/>
						</div>
					</>
				)}
				<div className="input-group">
					<label htmlFor="email">Correo Electrónico</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						disabled={loading}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						disabled={loading}
					/>
				</div>

				<button type="submit" className="auth-button" disabled={loading}>
					{loading ? 'Cargando...' : isLoginView ? 'Ingresar' : 'Registrarse'}
				</button>
				<div className="toggle-view">
					{isLoginView ? (
						<p>
							¿No tienes una cuenta? <span onClick={toggleView}>Regístrate</span>
						</p>
					) : (
						<p>
							¿Ya tienes una cuenta? <span onClick={toggleView}>Inicia Sesión</span>
						</p>
					)}
				</div>
			</form>
		</div>
	);
}

export default AuthForm;
