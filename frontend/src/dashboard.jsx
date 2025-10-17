// dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importa cualquier librería de gráficos que uses (por ejemplo, Chart.js/Recharts)

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
                {/* Eje Y */}
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

// Componente de Botones con Borde Degradado (simulando los de la izquierda de la imagen)
const GradientButton = ({ text }) => (
    <button className="w-full px-4 py-3 my-2 text-gray-800 font-medium rounded-xl shadow-inner bg-white border-2 border-transparent transition-all duration-300
        bg-gradient-to-r from-green-700 via-amber-700 to-orange-800 p-[3px] hover:shadow-xl hover:scale-[1.02] active:scale-100">
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
        // ... (Tu lógica de useEffect para cargar el usuario)
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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const stats = [
        { title: 'Inversores interesados', value: '12', color: 'bg-green-600' },
        { title: 'Inversores Activos', value: '5', color: 'bg-blue-600' },
        { title: 'Casos concretados', value: '8', color: 'bg-orange-600' },
        { title: 'Valoración', value: '4.5/5', color: 'bg-red-600' },
    ];

    const recentActivities = [
        { action: 'Un inversor vio tu perfil', time: 'Hace 2 horas', icon: '👀' },
        { action: 'Un inversor guardó tu proyecto', time: 'Hace 1 día', icon: '💾' },
        { action: 'Un inversor comentó en tu proyecto', time: 'Hace 2 días', icon: '💬' },
        { action: 'Un inversor compartió tu proyecto', time: 'Hace 3 días', icon: '🔗' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center space-x-4">
                    {/* Placeholder para el Logo de la App */}
                    <div className="text-xl font-bold text-green-700">
                        {/* El texto "aca va el logo de la app" se omite aquí ya que solo es un placeholder visual */}
                        <span className="text-2xl">💡</span>{' '}
                        <span className="hidden sm:inline">fondeAr</span>
                    </div>
                </div>

                {/* Botón Iniciar Sesión/Cerrar Sesión */}
                <div className="flex items-center space-x-3">
                    {/* Botón de la imagen (lo convertimos a Cerrar Sesión) */}
                    <button
                        className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200 hover:bg-green-800 active:scale-95"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                    {/* Info de Usuario (oculta en el diseño de la imagen, la mantenemos discreta) */}
                    <div className="hidden sm:flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div className="text-right text-sm">
                            <strong className="block text-gray-800">{user?.name || 'Usuario'}</strong>
                            <small className="block text-gray-500">{user?.email || 'usuario@ejemplo.com'}</small>
                        </div>
                    </div>
                </div>
            </header>

            {/* Menú de Navegación (similar a una barra lateral o tabs horizontales en móvil) */}
            <nav className="bg-white shadow-inner border-t border-b border-gray-100 sticky top-16 z-10">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="flex justify-between space-x-1 sm:space-x-4 overflow-x-auto">
                        {['inicio', 'metas', 'progreso', 'perfil'].map((tab) => (
                            <button
                                key={tab}
                                className={`
                                    py-3 px-3 sm:px-6 text-sm font-medium transition-colors duration-200 whitespace-nowrap
                                    ${activeTab === tab
                                        ? 'border-b-4 border-green-700 text-green-800 font-bold'
                                        : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
                                    }
                                `}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === 'inicio' && 'Inicio'}
                                {tab === 'metas' && 'Inversores Activos'}
                                {tab === 'progreso' && 'Proyectos'}
                                {tab === 'perfil' && 'Perfil'}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                {activeTab === 'inicio' && (
                    <div className="space-y-6">
                        {/* Diseño basado en la imagen - Combinando elementos de la imagen con el contenido del dashboard */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Bloque Izquierdo: Título y Botones Degradados */}
                            <div className="col-span-1 space-y-4">
                                <h1 className="text-3xl font-extrabold text-gray-900">
                                    Mi Dashboard
                                </h1>
                                <p className="text-xl font-medium text-gray-600">
                                    Bienvenido, {user?.name || 'Emprendedor'}!
                                </p>
                                {/* Simulación de los botones degradados de la izquierda */}
                                <div className="mt-6 space-y-3">
                                    <GradientButton text="Nuevo Inversor" />
                                    <GradientButton text="Ver Reporte" />
                                    <GradientButton text="Mi Reputación" />
                                </div>
                            </div>

                            {/* Bloque Derecho: Subtítulo y Gráfico */}
                            <div className="col-span-2 space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Añadir un subtítulo
                                </h2>
                                <p className="text-gray-500 leading-relaxed">
                                    Este es un espacio para un texto descriptivo,
                                    similar a un resumen o una breve explicación de
                                    la sección principal.
                                </p>
                                <BarChartExample />
                            </div>
                        </div>

                        {/* Sección de Estadísticas (Grid) */}
                        <h2 className="text-2xl font-semibold text-gray-800 pt-4">Resumen de Emprendimiento</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`p-5 rounded-xl shadow-lg text-white transform transition duration-300 hover:scale-[1.03] ${stat.color} hover:shadow-xl`}
                                >
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                    <p className="text-sm mt-1 opacity-90">{stat.title}</p>
                                </div>
                            ))}
                        </div>

                        {/* Actividad Reciente y Metas */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Tarjeta de Actividad Reciente */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Actividad Reciente</h3>
                                <div className="space-y-4">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-center space-x-3 border-b pb-3 last:border-b-0 last:pb-0">
                                            <span className="text-xl">{activity.icon}</span>
                                            <div className="flex-grow">
                                                <p className="text-gray-700 font-medium">{activity.action}</p>
                                                <small className="text-gray-500">{activity.time}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tarjeta de Metas Próximas */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Por concretarse (Metas)</h3>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Cierre de negocio con inversor X', progress: 75, color: 'bg-green-500' },
                                        { title: 'Presentación a inversores', progress: 30, color: 'bg-blue-500' },
                                        { title: 'Proyecto entregado', progress: 100, color: 'bg-amber-500' },
                                    ].map((goal, index) => (
                                        <div key={index} className="space-y-1">
                                            <p className="text-gray-700 font-medium">{goal.title}</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className={`${goal.color} h-2.5 rounded-full transition-all duration-500`}
                                                    style={{ width: `${goal.progress}%` }}
                                                ></div>
                                            </div>
                                            <small className="text-gray-500 block text-right">{goal.progress}% completado</small>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Otras pestañas (Estilos simples para contenido secundario) */}
                {activeTab === 'metas' && (
                    <div className="tab-content p-6 bg-white rounded-xl shadow-lg space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">Inversores Activos</h2>
                        <p className="text-gray-600">Gestiona los inversores aquí.</p>
                        <div className="p-4 bg-gray-100 rounded-lg text-gray-500 italic">
                            <p>Funcionalidad de inversores en desarrollo...</p>
                        </div>
                    </div>
                )}

                {activeTab === 'progreso' && (
                    <div className="tab-content p-6 bg-white rounded-xl shadow-lg space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">Mis Proyectos</h2>
                        <p className="text-gray-600">Visualiza tus proyectos.</p>
                        <button
                            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200 hover:bg-green-700 active:scale-95"
                            onClick={() => setButtonadd(true)}
                        >
                            Crear nuevo proyecto
                        </button>
                        <div className="placeholder-content mt-4">
                            {buttonadd && (
                                <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-md max-w-lg space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Título del proyecto"
                                        value={newProjectTitle}
                                        onChange={(e) => setNewProjectTitle(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <textarea
                                        placeholder="Describe tu proyecto..."
                                        value={newProjectDesc}
                                        onChange={(e) => setNewProjectDesc(e.target.value)}
                                        className="w-full min-h-[120px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                                    />
                                    <div className="flex gap-3 mt-3">
                                        <button
                                            className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200 active:scale-95"
                                            type="button"
                                            onClick={() => {
                                                console.log('Nuevo proyecto:', { title: newProjectTitle, description: newProjectDesc });
                                                setNewProjectTitle('');
                                                setNewProjectDesc('');
                                                setButtonadd(false);
                                            }}
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition duration-200 active:scale-95"
                                            type="button"
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
                            <p className="p-4 bg-gray-100 rounded-lg text-gray-500 italic mt-4">Funcionalidad de proyectos en desarrollo...</p>
                        </div>
                    </div>
                )}

                {activeTab === 'perfil' && (
                    <div className="tab-content p-6 bg-white rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mi Perfil</h2>
                        <div className="profile-card p-6 border border-gray-200 rounded-xl flex items-center space-x-6 bg-gray-50 max-w-xl">
                            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-3xl font-bold text-green-700 flex-shrink-0">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-800">{user?.name || 'Usuario'}</h3>
                                <p className="text-gray-600">{user?.email || 'usuario@ejemplo.com'}</p>
                                <small className="text-gray-500 block mt-1">Miembro desde: {user?.joinDate || '2024'}</small>
                            </div>
                            <button className="px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition duration-200 active:scale-95 flex-shrink-0">
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
                <p className="text-sm">© 2025 fondeAr - Todos los derechos reservados</p>
            </footer>
        </div>
    );
}

export default Dashboard;