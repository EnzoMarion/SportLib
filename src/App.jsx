import { useState, useEffect } from 'react'

// --- COMPOSANT : L'APPLICATION MOBILE (CÔTÉ CLIENT) ---
const MobileApp = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('home')
    const [crowdLevel, setCrowdLevel] = useState(42) // Pourcentage de remplissage
    const [loading, setLoading] = useState(false)

    // Simulation de données temps réel
    const refreshData = () => {
        setLoading(true)
        setTimeout(() => {
            setCrowdLevel(Math.floor(Math.random() * (80 - 30) + 30))
            setLoading(false)
        }, 800)
    }

    // Couleur dynamique selon l'affluence
    const getStatusColor = () => {
        if (crowdLevel < 40) return 'text-green-500 bg-green-50 border-green-200'
        if (crowdLevel < 75) return 'text-orange-500 bg-orange-50 border-orange-200'
        return 'text-red-500 bg-red-50 border-red-200'
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {/* CADRE DU TÉLÉPHONE */}
            <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-slate-900 flex flex-col">

                {/* Encoche (Notch) & Status Bar */}
                <div className="absolute top-0 inset-x-0 h-8 bg-white z-20 flex justify-between items-center px-6 text-xs font-bold text-gray-900">
                    <span>9:41</span>
                    <div className="flex gap-1">
                        <i className="fas fa-signal"></i>
                        <i className="fas fa-wifi"></i>
                        <i className="fas fa-battery-full"></i>
                    </div>
                </div>

                {/* HEADER APP */}
                <div className="pt-12 px-6 pb-4 bg-white flex justify-between items-center z-10">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ma Salle</p>
                        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                            Iron Gym Nantes <i className="fas fa-chevron-down text-xs text-gray-400"></i>
                        </h1>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                        <i className="fas fa-bell"></i>
                    </div>
                </div>

                {/* CONTENT SCROLLABLE */}
                <div className="flex-1 overflow-y-auto pb-20 no-scrollbar bg-gray-50">

                    {/* 1. SECTION LIVE GAUGE */}
                    <div className="px-6 py-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                   <span className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-1">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                     En direct
                   </span>
                                    <p className="text-xs text-gray-400">Mis à jour il y a 1 min</p>
                                </div>
                                <button onClick={refreshData} className={`${loading ? 'animate-spin' : ''} text-gray-400 hover:text-blue-600 transition`}>
                                    <i className="fas fa-sync-alt"></i>
                                </button>
                            </div>

                            {/* Jauge Circulaire CSS */}
                            <div className="flex justify-center mb-6 relative">
                                <div className="w-48 h-48 rounded-full flex items-center justify-center relative"
                                     style={{ background: `conic-gradient(${crowdLevel > 70 ? '#ef4444' : crowdLevel > 40 ? '#f97316' : '#22c55e'} ${crowdLevel}%, #f3f4f6 0)` }}>
                                    <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center z-10">
                                        <span className="text-5xl font-black text-slate-900">{crowdLevel}</span>
                                        <span className="text-sm text-gray-500 font-medium">personnes</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`text-center py-2 px-4 rounded-xl border ${getStatusColor()}`}>
                                <p className="font-bold text-lg">
                                    {crowdLevel < 40 ? 'Très Fluide 😎' : crowdLevel < 75 ? 'Affluence Moyenne 😐' : 'Très Chargé 🥵'}
                                </p>
                                <p className="text-xs opacity-80 mt-1">
                                    {crowdLevel < 40 ? 'Parfait pour s\'entraîner tranquillement.' : crowdLevel < 75 ? 'Zone cardio libre, zone poids chargée.' : 'Privilégiez les machines guidées.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. SECTION PREDICTION */}
                    <div className="px-6 mb-6">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2 opacity-90">
                                    <i className="fas fa-magic"></i>
                                    <span className="text-xs font-bold uppercase tracking-wide">Conseil IA</span>
                                </div>
                                <p className="font-bold text-lg leading-tight">
                                    L'affluence va baisser dans <span className="text-yellow-300">45 minutes</span>.
                                </p>
                                <p className="text-sm text-blue-100 mt-2">Attendez 18h30 pour votre séance jambes.</p>
                            </div>
                            <i className="fas fa-chart-line absolute -bottom-4 -right-4 text-8xl text-white opacity-10"></i>
                        </div>
                    </div>

                    {/* 3. SECTION GRAPHIQUE */}
                    <div className="px-6 mb-8">
                        <h3 className="font-bold text-slate-900 mb-4">Fréquentation aujourd'hui</h3>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-48 flex items-end justify-between gap-2">
                            {[10, 20, 15, 30, 45, 60, 85, 95, 70, 50, 40, 30].map((h, i) => (
                                <div key={i} className="w-full flex flex-col items-center gap-1 group cursor-pointer">
                                    <div
                                        style={{height: `${h}%`}}
                                        className={`w-full rounded-t-md transition-all duration-300 ${i === 7 ? 'bg-blue-600' : 'bg-gray-200 group-hover:bg-blue-300'}`}
                                    ></div>
                                    <span className="text-[10px] text-gray-400">{8 + i}h</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM NAVIGATION */}
                <div className="bg-white border-t border-gray-100 h-20 px-6 flex justify-between items-center absolute bottom-0 w-full z-20">
                    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
                        <i className="fas fa-home text-xl"></i>
                        <span className="text-[10px] font-medium">Accueil</span>
                    </button>
                    <button onClick={() => setActiveTab('qr')} className="flex flex-col items-center justify-center -mt-8">
                        <div className="w-16 h-16 bg-slate-900 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transform active:scale-95 transition">
                            <i className="fas fa-qrcode"></i>
                        </div>
                    </button>
                    <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>
                        <i className="fas fa-user text-xl"></i>
                        <span className="text-[10px] font-medium">Profil</span>
                    </button>
                </div>

                {/* BOUTON RETOUR POUR LA DEMO */}
                <button
                    onClick={onBack}
                    className="absolute top-2 right-2 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-xs hover:bg-black"
                >
                    X Fermer
                </button>

            </div>
        </div>
    )
}


// --- COMPOSANT PRINCIPAL (LANDING PAGE B2B) ---
function App() {
    const [currentView, setCurrentView] = useState('landing') // 'landing' ou 'app'
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [email, setEmail] = useState("")

    const toggleModal = () => setIsModalOpen(!isModalOpen)

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Merci ! Nous contacterons ${email} pour une démo.`)
        toggleModal()
    }

    // Si on est en mode "App", on affiche le composant MobileApp
    if (currentView === 'app') {
        return <MobileApp onBack={() => setCurrentView('landing')} />
    }

    // Sinon, on affiche la Landing Page B2B
    return (
        <div className="font-sans text-slate-800 antialiased bg-white">

            {/* NAVIGATION */}
            <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                <i className="fas fa-chart-bar"></i>
                            </div>
                            <span className="text-xl font-bold text-slate-900">GymFlow</span>
                        </div>
                        <div className="hidden md:flex space-x-8 text-sm font-medium">
                            <a href="#problem" className="text-slate-500 hover:text-blue-600 transition">Pourquoi nous ?</a>
                            <a href="#solution" className="text-slate-500 hover:text-blue-600 transition">La Solution</a>
                            <a href="#pricing" className="text-slate-500 hover:text-blue-600 transition">Tarifs</a>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentView('app')}
                                className="hidden md:block text-slate-600 font-medium text-sm hover:text-blue-600 transition"
                            >
                                Voir l'app Membre
                            </button>
                            <button
                                onClick={toggleModal}
                                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
                            >
                                Demander une démo
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            Pour salles indépendantes & CrossFit
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
                            Ne laissez plus vos abonnés partir chez <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Basic-Fit.</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                            Installez notre capteur d'affluence en 5 minutes. Donnez à vos membres la visibilité temps réel qu'ils attendent. Lissez votre fréquentation.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={toggleModal}
                                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition transform hover:-translate-y-1"
                            >
                                Equiper ma salle
                            </button>
                            <button
                                onClick={() => setCurrentView('app')}
                                className="px-8 py-4 rounded-xl font-bold text-lg text-slate-600 hover:bg-slate-50 transition border border-slate-200 flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-mobile-alt"></i> Tester l'app Membre
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARGUMENTS (PAIN POINTS) */}
            <section id="problem" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Pourquoi vos adhérents résilient-ils ?</h2>
                        <p className="mt-4 text-slate-600">Ce n'est pas le prix. C'est l'expérience utilisateur.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-xl mb-6"><i className="fas fa-users-slash"></i></div>
                            <h3 className="text-xl font-bold mb-3">L'effet "Sardine"</h3>
                            <p className="text-slate-600 text-sm">Un adhérent qui attend 10min pour un banc de muscu est un adhérent qui ne renouvellera pas le mois prochain.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl mb-6"><i className="fas fa-mobile-alt"></i></div>
                            <h3 className="text-xl font-bold mb-3">Le retard technologique</h3>
                            <p className="text-slate-600 text-sm">Vos concurrents low-cost ont des apps ultra-complètes. Vos adhérents s'attendent au même standard.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl mb-6"><i className="fas fa-chart-line"></i></div>
                            <h3 className="text-xl font-bold mb-3">Manque de données</h3>
                            <p className="text-slate-600 text-sm">Vous pilotez à l'aveugle. Notre dashboard vous dit quand renforcer le staff ou lancer une promo.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Equipez votre salle pour moins de 3€ / jour.</h2>
                        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">Boîtier Plug & Play. Installation en 5 minutes. Pas de travaux.</p>

                        <div className="inline-block bg-white text-slate-900 rounded-2xl p-1 pr-8 text-left mb-8 shadow-2xl">
                            <div className="flex items-center gap-6">
                                <div className="bg-blue-600 text-white px-6 py-6 rounded-xl font-bold text-2xl">
                                    89€ <span className="text-sm font-normal opacity-75">/mois</span>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Offre Starter</div>
                                    <div className="text-slate-500 text-sm">Sans engagement</div>
                                </div>
                            </div>
                        </div>

                        <ul className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-sm text-slate-300 mb-10">
                            <li className="flex items-center gap-2"><i className="fas fa-check text-green-400"></i> Capteur IA inclus</li>
                            <li className="flex items-center gap-2"><i className="fas fa-check text-green-400"></i> App membres illimitée</li>
                            <li className="flex items-center gap-2"><i className="fas fa-check text-green-400"></i> Support 24/7</li>
                        </ul>

                        <button
                            onClick={toggleModal}
                            className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
                        >
                            Commander mon capteur
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-50 border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center opacity-60">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <i className="fas fa-chart-bar"></i>
                        <span className="font-bold">GymFlow</span>
                    </div>
                    <p className="text-sm">© 2025 GymFlow. Tech for Good Project.</p>
                </div>
            </footer>

            {/* MODAL DE CONTACT B2B */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Obtenir une démo</h3>
                            <button onClick={toggleModal} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times text-xl"></i></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nom de votre salle</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Ex: Iron Gym Nantes" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email pro</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="gerant@irongym.com" required />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                                Être recontacté
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App