import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm() {
<<<<<<< HEAD
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("opcion1");
  const handleToggle = () => {
    setSelectedOption((prev) => (prev === "opcion1" ? "opcion2" : "opcion1"));
  };

  const navigate = useNavigate();

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setName("");
    setEmail("");
    setPassword("");
    setMsg("");
    setSelectedOption("opcion1");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      if (isLoginView) {
        const loginData = { email, password };
        console.log("Objeto de Login:", loginData);
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });
        const data = await response.json();
        if (response.ok) {
          setMsg("✅ ¡Login exitoso! Redirigiendo...");
          if (data.token) localStorage.setItem("token", data.token);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else {
          setMsg(`❌ Error: ${data.msg || "Credenciales incorrectas"}`);
        }
      } else {
        const userData = { email, password, name: name, rol: selectedOption };
        console.log("Objeto de Registro:", userData);
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMsg("✅ ¡Usuario registrado exitosamente!");
          setTimeout(() => setIsLoginView(true), 2000);
        } else {
          setMsg(`❌ Error: ${data.msg || "Error en el registro"}`);
        }
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setMsg("❌ Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fondo Degradado
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-900 to-orange-900 p-4">
      {/* Fondo Blanco con Sombra y Esquinas Redondeadas */}
      <form
        className="w-full max-w-sm p-8 bg-white rounded-[32px] shadow-2xl"
        onSubmit={handleSubmit}
      >
        {/*subrayado naranja y verde */}
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {isLoginView ? (
            <>
              Iniciar{" "}
              <span className="border-b-2 border-orange-600 pb-[2px]">
                Sesión
              </span>
            </>
          ) : (
            <>
              Crear{" "}
              <span className="border-b-2 border-orange-600 pb-[2px]">
                Cuenta
              </span>
            </>
          )}
        </h2>

        {/* Mensaje de Éxito/Error (Estilizado para ser discreto pero visible) */}
        {msg && (
          <div
            className={`p-3 mb-4 rounded-lg text-sm text-center font-medium ${
              msg.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {msg}
          </div>
        )}

        {!isLoginView && (
          <>
            <div className="mb-4">
              <label
                htmlFor="selectOption"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Seleccione su Rol
              </label>
              {/* Borde degradado*/}
              <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300">
                <select
                  id="selectOption"
                  className="w-full p-3 border-none bg-white rounded-md text-gray-900 focus:ring-0 focus:outline-none"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  disabled={loading}
                >
                  <option value="opcion1">Seleccione un rol</option>
                  <option value="opcion2">Inversor</option>
                  <option value="opcion3">Emprendedor</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nombre
              </label>
              {/* Borde degradado para Nombre */}
              <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300">
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border-none bg-white rounded-md text-gray-900 focus:ring-0 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </>
        )}

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Correo Electrónico
          </label>

          {/* borde Degradado*/}
          <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300">
            <input
              type="email"
              id="email"
              className="w-full p-3 border-none bg-white rounded-md text-gray-900 focus:ring-0 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Contraseña
          </label>

          {/* Borde Degradado (Verde a Naranja) */}
          <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300">
            <input
              type="password"
              id="password"
              className="w-full p-3 border-none bg-white rounded-md text-gray-900 focus:ring-0 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Boton con fondo Verde con Sombra */}
        <button
          type="submit"
          className={`w-full py-3 px-4 font-semibold rounded-lg shadow-xl transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-gray-600"
              : "bg-emerald-700 hover:bg-emerald-800 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            {isLoginView ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            <span
              onClick={toggleView}
              className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer ml-1 transition duration-150"
            >
              {isLoginView ? "Regístrate" : "Inicia Sesión"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
=======
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

	const navigate = useNavigate();

	const toggleView = () => {
		setIsLoginView(!isLoginView);
		setName('');
		setEmail('');
		setPassword('');
		setMsg('');
		setSelectedOption('opcion1');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setMsg('');

	try {
		const url = isLoginView
			? 'http://localhost:3001/api/auth/login'
			: 'http://localhost:3001/api/auth/register';

		const body = isLoginView
			? { email, password }
			: { email, password, name: name, rol: selectedOption };

		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
			// credentials: 'include', // habilitar sólo si el backend usa cookies y CORS lo permite
		});

		// Intentar parsear JSON seguro
		let data;
		try {
			data = await response.json();
		} catch (err) {
			const text = await response.text();
			throw new Error(
				`Respuesta no-JSON del servidor (status ${response.status}): ${text}`,
			);
		}

		if (!response.ok) {
			throw new Error(data.msg || `Error de servidor (${response.status})`);
		}

		// OK
		if (isLoginView) {
			setMsg('✅ ¡Login exitoso! Redirigiendo...');
			if (data.token) localStorage.setItem('token', data.token);

			// Determinar a qué dashboard redirigir según el rol
			let dashboardRoute = '/dashboard'; // por defecto

			if (data.user && data.user.rol) {
				if (data.user.rol === 'opcion2' || data.user.rol === 'inversor') {
					dashboardRoute = '/dashboard-inversor';
				} else if (data.user.rol === 'opcion3' || data.user.rol === 'emprendedor') {
					dashboardRoute = '/dashboard';
				}
			} else {
				// Si no viene el rol del backend, usar el seleccionado en el formulario
				if (selectedOption === 'opcion2') {
					dashboardRoute = '/dashboard-inversor';
				}
			}

			setTimeout(() => navigate(dashboardRoute), 1200);
		} else {
			setMsg('✅ ¡Usuario registrado exitosamente!');
			// Guardar el rol en localStorage para uso futuro
			if (selectedOption) {
				localStorage.setItem('userRole', selectedOption);
			}
			setTimeout(() => setIsLoginView(true), 1400);
		}
	} catch (error) {
		console.error('handleSubmit error:', error);
		setMsg(`❌ ${error.message || 'Error de conexión con el servidor'}`);
	} finally {
		setLoading(false);
	}
};

	return (
		// Fondo Degradado
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-900 to-orange-900 p-4">
			{/* Fondo Blanco con Sombra y Esquinas Redondeadas */}
			<form
				className="w-full max-w-sm p-8 bg-white rounded-[32px] shadow-2xl"
				onSubmit={handleSubmit}
			>
				{/*subrayado naranja y verde */}
				<h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
					{isLoginView ? (
						<>
							Iniciar{' '}
							<span className="border-b-2 border-orange-600 pb-[2px]">Sesión</span>
						</>
					) : (
						<>
							Crear <span className="border-b-2 border-orange-600 pb-[2px]">Cuenta</span>
						</>
					)}
				</h2>

				{/* Mensaje de Éxito/Error (Estilizado para ser discreto pero visible) */}
				{msg && (
					<div
						className={`p-3 mb-4 rounded-lg text-sm text-center font-medium ${
							msg.includes('✅')
								? 'bg-green-100 text-green-700'
								: 'bg-red-100 text-red-700'
						}`}
					>
						{msg}
					</div>
				)}

				{!isLoginView && (
					<>
						<div className="mb-4">
							<label
								htmlFor="selectOption"
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								Seleccione su Rol
							</label>
							{/* Borde degradado*/}
							<div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300">
								<select
									id="selectOption"
									className="w-full p-3 border-none bg-white rounded-md text-gray-900 focus:ring-0 focus:outline-none"
									value={selectedOption}
									onChange={(e) => setSelectedOption(e.target.value)}
									disabled={loading}
								>
									<option value="opcion1">Seleccione un rol</option>
									<option value="opcion2">Inversor</option>
									<option value="opcion3">Emprendedor</option>
								</select>
							</div>
						</div>
						<div className="mb-6">
							<label
								htmlFor="name"
								className="block text-sm font-semibold text-gray-700 mb-2"
							>
								Nombre
							</label>
							{/* Borde degradado para Nombre */}
							<div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300">
								<input
									type="text"
									id="name"
									className="w-full p-3 border-none bg-white rounded-md text-gray-900 focus:ring-0 focus:outline-none"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									disabled={loading}
								/>
							</div>
						</div>
					</>
				)}

				<div className="mb-6">
					<label
						htmlFor="email"
						className="block text-sm font-semibold text-gray-700 mb-2"
					>
						Correo Electrónico
					</label>

					{/* borde Degradado*/}
					<div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300">
						<input
							type="email"
							id="email"
							className="w-full p-3 border-none bg-white rounded-md text-gray-900 focus:ring-0 focus:outline-none"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={loading}
						/>
					</div>
				</div>
				<div className="mb-8">
					<label
						htmlFor="password"
						className="block text-sm font-semibold text-gray-700 mb-2"
					>
						Contraseña
					</label>

					{/* Borde Degradado (Verde a Naranja) */}
					<div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300">
						<input
							type="password"
							id="password"
							className="w-full p-3 border-none bg-white rounded-md text-gray-900 focus:ring-0 focus:outline-none"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							disabled={loading}
						/>
					</div>
				</div>

				{/* Boton con fondo Verde con Sombra */}
				<button
					type="submit"
					className={`w-full py-3 px-4 font-semibold rounded-lg shadow-xl transition duration-300 ${
						loading
							? 'bg-gray-400 cursor-not-allowed text-gray-600'
							: 'bg-emerald-700 hover:bg-emerald-800 text-white'
					}`}
					disabled={loading}
				>
					{loading ? 'Cargando...' : 'Ingresar'}
				</button>

				<div className="mt-4 text-center text-sm text-gray-600">
					<p>
						{isLoginView ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
						<span
							onClick={toggleView}
							className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer ml-1 transition duration-150"
						>
							{isLoginView ? 'Regístrate' : 'Inicia Sesión'}
						</span>
					</p>
				</div>
			</form>
		</div>
	);
>>>>>>> dev-leo
}

export default AuthForm;
