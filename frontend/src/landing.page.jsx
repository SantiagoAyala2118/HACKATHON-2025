import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo-fondeAr.png";

const handleDireccion = () => {
  window.location.href = "/login";
};

export const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("");
  };

  const testimonials = [
    {
      id: 1,
      name: "usuario1",
      role: "Usuario Premium",
      comment: "gracias a esta app pude encontrar inversionistas facilmente.",
      avatar: "👤",
    },
    {
      id: 2,
      name: "usuario2",
      role: "Emprendedor",
      comment: "gracias a esta app pude conseguir fondos para mi startup.",
      avatar: "",
    },
    {
      id: 3,
      name: "usuario3",
      role: "Inversor",
      comment:
        "Simple, rapido y eficiente. Una buena plataforma para encontrar proyectos prometedores.",
      avatar: "",
    },
  ];

  // Datos para el gráfico (simulado)
  const chartData = [
    { month: "Ene", value: 65 },
    { month: "Feb", value: 78 },
    { month: "Mar", value: 90 },
    { month: "Abr", value: 81 },
    { month: "May", value: 56 },
    { month: "Jun", value: 55 },
    { month: "Jul", value: 40 },
  ];

  const maxValue = Math.max(...chartData.map((item) => item.value));

  return (
    <div className="landing-page min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="landing-header sticky top-0 z-10 bg-white shadow-md">
        <div className="header-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="logo-section flex items-center space-x-2">
            <span className="logo-text text-xl font-bold text-orange-900">
              fondeAr
            </span>
          </div>
          <button
            className="login-btn py-2 px-4 bg-gradient-to-r from-emerald-900 to-orange-900 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-800 transition duration-300"
            onClick={handleDireccion}
          >
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section py-16 sm:py-24">
        <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-start">
          {/* Columna Izquierda */}
          <div className="left-column space-y-12">
            <div className="logo-square bg-white p-8 rounded-xl shadow-2xl border-t-4 border-orange-900 flex flex-col items-center">
              <img
                src={logo}
                alt="Logo de fondeAr"
                className="w-80 h 40 object-contain mb-3"
              />
            </div>

            {/* Descripción de la Problemática */}
            <div className="problem-description space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-orange-900 pl-3">
                Descripción del Problema
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Fondear es la plataforma que une a emprendedores visionarios con
                inversionistas inteligentes. Si tenés una idea con potencial,
                acá podés hacerla brillar ante quienes pueden impulsarla. Si
                buscás invertir, encontrá los proyectos más prometedores antes
                que nadie.
              </p>
              <p className="text-gray-700 leading-relaxed italic border-l-2 pl-3 border-orange-900">
                Emprendedores: mostrales tu proyecto al mundo y encontrá el
                apoyo que necesitás para hacerlo realidad.
              </p>
              <p className="text-gray-700 leading-relaxed italic border-l-2 pl-3 border-orange-900">
                Inversionistas: descubrí startups con futuro y convertite en
                parte de su éxito desde el principio.
              </p>
              <p className="text-gray-700 leading-relaxed">
                En Fondear, creemos que cuando las buenas ideas y el capital se
                encuentran, nacen grandes oportunidades. Creá, invertí y crecé.
                El futuro se fondea hoy.
              </p>
            </div>

            {/* Opiniones (Testimonios) */}
            <div className="testimonials-section pt-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-orange-900 pl-3">
                Lo que dicen nuestros usuarios
              </h3>
              <div className="testimonials-grid grid grid-cols-1 sm:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="testimonial-card bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  >
                    <div className="testimonial-header flex items-center mb-3">
                      <div className="testimonial-avatar text-2xl mr-3 bg-emerald-900 p-2 rounded-full"></div>
                      <div className="testimonial-info">
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-emerald-900">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="testimonial-comment text-gray-700 text-sm italic">
                      "{testimonial.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha - Gráfico */}
          <div className="right-column md:sticky top-20">
            <div className="chart-container bg-white p-8 rounded-xl shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Nuestro Impacto en Números
              </h3>
              <p className="text-gray-600">
                Progreso de usuarios en los últimos meses
              </p>

              <div className="chart flex justify-between items-end h-64 border-b border-l border-gray-300 pr-2 pt-2">
                {chartData.map((item, index) => (
                  <div
                    key={index}
                    className="chart-bar-container flex flex-col items-center justify-end h-full w-1/8 mx-1 group cursor-pointer"
                  >
                    <div
                      className="chart-bar w-full bg-orange-900 rounded-t-md transition-all duration-700 hover:bg-emerald-900 relative"
                      style={{
                        height: `${(item.value / maxValue) * 90}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <span className="bar-value absolute -top-5 text-xs font-semibold text-orange-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {item.value}%
                      </span>
                    </div>
                    <span className="bar-label text-xs mt-1 text-gray-500">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>

              <div className="chart-stats flex justify-around pt-4 border-t border-gray-100">
                <div className="stat-item text-center">
                  <span className="stat-number text-3xl font-bold text-emerald-700">
                    +15K
                  </span>
                  <span className="stat-label block text-gray-500 text-sm">
                    Usuarios activos
                  </span>
                </div>
                <div className="stat-item text-center">
                  <span className="stat-number text-3xl font-bold text-emerald-700">
                    95%
                  </span>
                  <span className="stat-label block text-gray-500 text-sm">
                    Satisfacción
                  </span>
                </div>
                <div className="stat-item text-center">
                  <span className="stat-number text-3xl font-bold text-emerald-700">
                    +200%
                  </span>
                  <span className="stat-label block text-gray-500 text-sm">
                    Crecimiento
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="features-section bg-gray-100 py-16 sm:py-24 mt-12">
        <div className="features-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12">
            ¿Por qué elegir fondeAr?
          </h2>
          <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta de característica 1 */}
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Rápido y intuitivo
              </h3>
              <p className="text-gray-600">
                Publica tu proyecto o encontrá oportunidades en segundos. Todo
                está pensado para que avances sin trabas.
              </p>
            </div>
            {/* Tarjeta de característica 2 */}
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Buena comunicacion
              </h3>
              <p className="text-gray-600">
                Conecta directo con inversores o emprendedores. Sin
                intermediarios, sin vueltas, solo oportunidades reales.
              </p>
            </div>
            {/* Tarjeta de característica 3 */}
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-emerald-600 to-orange-600 transition-all duration-300"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Seguro y Confiable
              </h3>
              <p className="text-gray-600">
                Tu información y tus inversiones están protegidas. En FondeAr,
                la confianza es la base de cada conexión.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
