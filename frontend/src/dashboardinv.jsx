import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo-fondeAr.png';

// Clase base para el botón principal con gradiente
const PRIMARY_BUTTON_GRADIENT =
    'bg-gradient-to-r from-emerald-700 to-orange-800 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]';

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
        // Simulación de fetch de proyectos
        // NOTA: Se usan datos hardcodeados ya que /api/projects no está disponible.
        const demoProjects = [
            {
                _id: '1',
                title: 'App de Gestión Financiera',
                description: 'Plataforma mobile-first para gestión personal de finanzas con IA.',
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
                description: 'E-commerce para productos locales y sostenibles con fuerte enfoque en Latam.',
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
                description: 'Sistema de aprendizaje adaptativo para educación online para escuelas secundarias.',
                category: 'edtech',
                fundingGoal: 100000,
                currentFunding: 40000,
                entrepreneur: 'Ana Martínez',
                createdAt: '2024-03-05',
                status: 'active',
            },
            {
                _id: '4',
                title: 'HealthTech Remoto',
                description: 'Monitoreo de pacientes crónicos vía dispositivos IoT y IA.',
                category: 'healthtech',
                fundingGoal: 120000,
                currentFunding: 110000,
                entrepreneur: 'Luis Pérez',
                createdAt: '2024-02-01',
                status: 'active',
            },
        ];
        setProjects(demoProjects);
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

    const handleInvestment = (projectId, amount) => {
        console.log(`Simulando inversión de $${amount} en proyecto ${projectId}`);
        
        alert('Simulación: Inversión registrada. Actualiza la página para ver el cambio si fuera real.');
        
    };

    const stats = [
        { title: 'Inversiones Activas', value: '8', color: 'green' },
        { title: 'Monto Total Invertido', value: '$250K', color: 'blue' },
        { title: 'ROI Promedio', value: '18%', color: 'orange' },
        { title: 'Proyectos Exitosos', value: '12', color: 'red' },
    ];

    const recentActivities = [
        { action: 'Nuevo proyecto en tu categoría de interés', time: 'Hace 2 horas', },
        { action: 'Actualización de proyecto "App Financiera"', time: 'Hace 1 día',  },
        { action: 'Retorno de inversión recibido', time: 'Hace 3 días', },
        { action: 'Reunión con emprendedor confirmada', time: 'Hace 5 días',  },
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
            green: 'border-l-emerald-600', 
            blue: 'border-l-orange-800', 
            orange: 'border-l-amber-500', 
            red: 'border-l-red-500',
        };
        return colors[color] || 'border-l-gray-500';
    };

    const getProgressPercentage = (current, goal) => {
        return Math.min((current / goal) * 100, 100);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Header */}
            <header className="bg-white/95 backdrop-blur-sm py-4 px-4 sm:px-10 flex flex-col sm:flex-row justify-between items-center shadow-lg sticky top-0 z-10">
                <div className="flex justify-between items-center w-full sm:w-auto mb-3 sm:mb-0">
                
					<img className='w-22' src={logo} alt="" />
					
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {user?.name?.charAt(0) || 'I'}
                        </div>
                        <div className="flex flex-col text-sm truncate">
                            <strong className="text-gray-800">{user?.name || 'Inversor'}</strong>
                            <small className="text-gray-600 truncate">
                                {user?.company || 'Firma de Inversión'}
                            </small>
                        </div>
                    </div>
                    <button
                        className={`py-2 px-4 rounded-lg cursor-pointer text-sm transition-all duration-300 ${PRIMARY_BUTTON_GRADIENT}`}
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white/90 shadow-inner border-b border-gray-100 sticky top-[72px] sm:top-[76px] z-10">
                <div className="flex gap-2.5 overflow-x-auto max-w-7xl mx-auto px-4 sm:px-10">
                    {['inicio', 'proyectos', 'inversiones', 'perfil'].map((tab) => (
                        <button
                            key={tab}
                            className={`
                                flex-shrink-0 py-3.5 px-3 sm:px-5 cursor-pointer text-base font-medium transition-all duration-300 border-b-4 border-transparent
                                ${
                                    activeTab === tab
                                        ? 'text-emerald-700 border-b-emerald-700 bg-emerald-700/10'
                                        : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-700/5 rounded-lg '
                                }
                            `}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'inicio' && 'Inicio'}
                            {tab === 'proyectos' && 'Descubrir Proyectos'}
                            {tab === 'inversiones' && 'Mis Inversiones'}
                            {tab === 'perfil' && 'Perfil'}
                        </button>
                    ))}
                </div>
            </nav>

            
            <main className="p-4 sm:p-10 max-w-7xl mx-auto w-full">
                
                {activeTab === 'inicio' && (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-orange-900 pl-3">
                            Panel de Control
                        </h2>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`bg-white p-6 rounded-xl flex items-center gap-4 shadow-xl transition-transform duration-300 hover:scale-[1.02] border-l-4 ${getBorderColor(
                                        stat.color,
                                    )}`}
                                >
                                    <div className="text-3xl text-emerald-700">📈</div>
                                    <div>
                                        <h3 className="text-3xl font-extrabold text-gray-800 m-0">{stat.value}</h3>
                                        <p className="text-gray-600 mt-1 mb-0 font-medium">{stat.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            <div className="bg-white p-6 rounded-xl shadow-xl">
                                <h3 className="text-xl font-bold text-gray-900 mt-0 mb-4 border-b border-gray-100 pb-3">
                                    Actividad Reciente
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {recentActivities.map((activity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-b-0"
                                        >
                                            <span className="text-lg text-emerald-600">{activity.icon}</span>
                                            <div className="flex-1">
                                                <p className="text-gray-800 font-medium m-0">{activity.action}</p>
                                                <small className="text-gray-500">{activity.time}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Portfolio Performance Card */}
                            <div className="bg-white p-6 rounded-xl shadow-xl">
                                <h3 className="text-xl font-bold text-gray-900 mt-0 mb-4 border-b border-gray-100 pb-3">
                                    Rendimiento de Portafolio
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { project: 'App Financiera', performance: '+25%' },
                                        { project: 'Plataforma EdTech', performance: '+18%' },
                                        { project: 'Marketplace Local', performance: '+12%' },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0"
                                        >
                                            <div>
                                                <p className="text-gray-800 font-medium m-0">{item.project}</p>
                                                <small className="text-gray-500">ROI desde inversión</small>
                                            </div>
                                            <span
                                                className={`font-extrabold text-lg ${
                                                    item.performance.startsWith('+') ? 'text-emerald-600' : 'text-red-500'
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

                {/* Proyectos */}
                {activeTab === 'proyectos' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
                            <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-orange-900 pl-3">
                                Descubrir Proyectos
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="Buscar proyectos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-sm"
                                />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-sm bg-white"
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
                                    className="bg-white p-6 rounded-xl shadow-xl transition-transform duration-300 hover:scale-[1.01] border-t-4 border-orange-800"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-800 m-0">
                                            {project.title}
                                        </h3>
                                        <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full">
                                            {project.category}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Emprendedor: {project.entrepreneur}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                                            <span>Meta: <span className="text-orange-900">${project.fundingGoal.toLocaleString()}</span></span>
                                            <span>Recaudado: <span className="text-emerald-700">${project.currentFunding.toLocaleString()}</span></span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${getProgressPercentage(
                                                        project.currentFunding,
                                                        project.fundingGoal,
                                                    )}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="text-right text-xs text-emerald-700 font-semibold mt-1">
                                            {Math.round(
                                                getProgressPercentage(
                                                    project.currentFunding,
                                                    project.fundingGoal,
                                                ),
                                            )}
                                            % completado
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-3 border-t border-gray-100">
                                        <button
                                            className={`flex-1 py-2 px-3 text-sm ${PRIMARY_BUTTON_GRADIENT}`}
                                            onClick={() => handleInvestment(project._id, 5000)}
                                        >
                                            Invertir
                                        </button>
                                        <button className="flex-1 bg-gray-300 text-gray-800 py-2 px-3 text-sm font-medium rounded-lg hover:bg-gray-400 transition-all duration-300 active:scale-[0.99]">
                                            Contactar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProjects.length === 0 && (
                            <div className="bg-white p-10 rounded-xl text-center text-gray-600 shadow-xl">
                                <p className="text-lg">No se encontraron proyectos que coincidan con tu búsqueda.</p>
                                <p className="text-sm mt-2">Intenta con otra categoría o palabra clave.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Inversiones Tab */}
                {activeTab === 'inversiones' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-orange-900 pl-3">
                            Mis Inversiones
                        </h2>
                        <div className="bg-white p-6 rounded-xl shadow-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px] text-left">
                                    <thead>
                                        <tr className="border-b-2 border-emerald-700/50 bg-gray-50 text-gray-700 text-sm uppercase">
                                            <th className="py-3 px-4 font-bold">Proyecto</th>
                                            <th className="py-3 px-4 font-bold">Monto Invertido</th>
                                            <th className="py-3 px-4 font-bold">Fecha</th>
                                            <th className="py-3 px-4 font-bold">ROI</th>
                                            <th className="py-3 px-4 font-bold">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { project: 'App Financiera', amount: 25000, date: '15/02/2024', roi: '+25%', status: 'Activa' },
                                            { project: 'Plataforma EdTech', amount: 50000, date: '10/01/2024', roi: '+18%', status: 'Activa' },
                                            { project: 'Marketplace Local', amount: 15000, date: '05/03/2024', roi: '+12%', status: 'Activa' },
                                        ].map((investment, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-100 hover:bg-emerald-50/50 transition duration-150"
                                            >
                                                <td className="py-3 px-4 font-medium text-gray-800">{investment.project}</td>
                                                <td className="py-3 px-4 text-orange-900 font-semibold">
                                                    ${investment.amount.toLocaleString()}
                                                </td>
                                                <td className="py-3 px-4 text-gray-600">{investment.date}</td>
                                                <td
                                                    className={`py-3 px-4 font-extrabold ${
                                                        investment.roi.startsWith('+') ? 'text-emerald-600' : 'text-red-500'
                                                    }`}
                                                >
                                                    {investment.roi}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
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
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-orange-900 pl-3">
                            Mi Perfil de Inversor
                        </h2>
                        <div className="bg-white p-7 rounded-xl shadow-xl max-w-4xl mx-auto">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                                <div className="w-20 h-20 bg-emerald-700 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg">
                                    {user?.name?.charAt(0) || 'I'}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-800 m-0">
                                        {user?.name || 'Inversor'}
                                    </h3>
                                    <p className="text-gray-600 my-1 mx-0">{user?.email || 'inversor@empresa.com'}</p>
                                    <small className="text-gray-500">
                                        Miembro desde: {user?.joinDate || '2024'}
                                    </small>
                                </div>
                                <button className={`py-2.5 px-5 text-base ${PRIMARY_BUTTON_GRADIENT} flex-shrink-0`}>
                                    Editar Perfil
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-orange-900 mb-3 border-b pb-2">
                                        Información de la Firma
                                    </h4>
                                    <div className="space-y-3">
                                        <p>
                                            <strong className="text-gray-800">Empresa:</strong> {user?.company || 'No especificado'}
                                        </p>
                                        <p>
                                            <strong className="text-gray-800">Enfoque de Inversión:</strong>{' '}
                                            <span className="text-emerald-700 font-medium">{user?.investmentFocus || 'No especificado'}</span>
                                        </p>
                                        <p>
                                            <strong className="text-gray-800">Tipo de Inversor:</strong> {user?.type || 'Inversor'}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-orange-900 mb-3 border-b pb-2">
                                        Preferencias Clave
                                    </h4>
                                    <div className="space-y-3">
                                        <p>
                                            <strong className="text-gray-800">Ticket Promedio:</strong> <span className="text-emerald-700 font-medium">$25,000 - $100,000</span>
                                        </p>
                                        <p>
                                            <strong className="text-gray-800">Etapa Preferida:</strong> Early Stage
                                        </p>
                                        <p>
                                            <strong className="text-gray-800">Sectores:</strong> Tecnología, Fintech, SaaS
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-emerald-900 to-orange-900 text-white text-center py-5 mt-10">
                <p className="text-sm">© 2025 fondeAr - Plataforma para Inversores</p>
            </footer>
        </div>
    );
}

export default DashboardI;