import { useState, useEffect } from 'react'

// --- COMPOSANT : L'APPLICATION MOBILE (CÔTÉ CLIENT) ---
const MobileApp = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('home')
    const [crowdLevel, setCrowdLevel] = useState(42)
    const [loading, setLoading] = useState(false)

    // Données simulées pour le graphique (Heure par heure)
    // [Heure, % Remplissage]
    const graphData = [
        { hour: '06h', value: 10 }, { hour: '08h', value: 30 },
        { hour: '10h', value: 45 }, { hour: '12h', value: 80 },
        { hour: '14h', value: 50 }, { hour: '16h', value: 65 },
        { hour: '18h', value: 95 }, { hour: '20h', value: 70 },
        { hour: '22h', value: 20 }
    ]

    const refreshData = () => {
        setLoading(true)
        setTimeout(() => {
            setCrowdLevel(Math.floor(Math.random() * (90 - 20) + 20))
            setLoading(false)
        }, 800)
    }

    const getStatusColor = () => {
        if (crowdLevel < 40) return 'text-green-600 bg-green-50 border-green-200'
        if (crowdLevel < 80) return 'text-orange-500 bg-orange-50 border-orange-200'
        return 'text-red-500 bg-red-50 border-red-200'
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-slate-900 flex flex-col">

                {/* Status Bar */}
                <div className="absolute top-0 inset-x-0 h-10 bg-white z-20 flex justify-between items-end px-6 pb-2 text-xs font-bold text-gray-900">
                    <span>18:32</span>
                    <div className="flex gap-1">
                        <i className="fas fa-signal"></i>
                        <i className="fas fa-wifi"></i>
                        <i className="fas fa-battery-three-quarters"></i>
                    </div>
                </div>

                {/* Header */}
                <div className="pt-14 px-6 pb-4 bg-white flex justify-between items-center z-10 border-b border-gray-50">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ma Salle</p>
                        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                            Iron Gym Nantes <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        </h1>
                    </div>
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-slate-600 shadow-sm border border-gray-100">
                        <i className="fas fa-user-circle text-xl"></i>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto pb-24 no-scrollbar bg-gray-50">

                    {/* JAUGE LIVE */}
                    <div className="px-6 py-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                   <span className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1">
                     <span className="relative flex h-3 w-3">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                     </span>
                     En direct
                   </span>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Capteur GymFlow Actif</p>
                                </div>
                                <button onClick={refreshData} className={`${loading ? 'animate-spin' : ''} text-gray-400 hover:text-blue-600 transition p-2`}>
                                    <i className="fas fa-sync-alt"></i>
                                </button>
                            </div>

                            <div className="flex justify-center mb-6 relative">
                                {/* Cercle CSS Conique */}
                                <div className="w-48 h-48 rounded-full flex items-center justify-center relative shadow-inner"
                                     style={{ background: `conic-gradient(${crowdLevel > 75 ? '#ef4444' : crowdLevel > 40 ? '#f97316' : '#22c55e'} ${crowdLevel}%, #f1f5f9 0)` }}>
                                    <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center z-10 shadow-md">
                                        <span className="text-5xl font-black text-slate-900 tracking-tighter">{crowdLevel}</span>
                                        <span className="text-xs text-gray-500 font-bold uppercase mt-1">Personnes</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`text-center py-3 px-4 rounded-xl border ${getStatusColor()} transition-colors duration-500`}>
                                <p className="font-bold text-lg leading-none mb-1">
                                    {crowdLevel < 40 ? 'Très Fluide 😎' : crowdLevel < 80 ? 'Moyennement Chargé 😐' : 'Saturé 🥵'}
                                </p>
                                <p className="text-xs opacity-90 font-medium">
                                    {crowdLevel < 40 ? 'Machines libres. Foncez !' : crowdLevel < 80 ? 'Quelques attentes aux bancs.' : 'Privilégiez le cardio ou revenez + tard.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* GRAPHIQUE FRÉQUENTATION (CORRIGÉ) */}
                    <div className="px-6 mb-8">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <i className="fas fa-chart-bar text-blue-600"></i> Fréquentation Aujourd'hui
                        </h3>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            {/* Conteneur du graphique avec hauteur fixe explicite */}
                            <div className="h-40 flex items-end justify-between gap-2">
                                {graphData.map((data, index) => {
                                    // Logique pour colorer différemment l'heure actuelle (index 6 = 18h)
                                    const isCurrent = index === 6;
                                    const isPast = index < 6;
                                    return (
                                        <div key={index} className="flex flex-col items-center gap-2 w-full h-full justify-end group">
                                            {/* Tooltip au survol */}
                                            <div className="opacity-0 group-hover:opacity-100 absolute -mt-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded transition-opacity z-10">
                                                {data.value} pers.
                                            </div>
                                            {/* Barre */}
                                            <div
                                                style={{ height: `${data.value}%` }}
                                                className={`w-full rounded-t-md transition-all duration-500 ${isCurrent ? 'bg-blue-600 shadow-lg shadow-blue-200' : isPast ? 'bg-slate-200' : 'bg-blue-100'}`}
                                            ></div>
                                            {/* Label Heure */}
                                            <span className={`text-[10px] font-bold ${isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>
                           {data.hour}
                         </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* PREDICTION IA */}
                    <div className="px-6 mb-6">
                        <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-600 text-[10px] font-bold px-2 py-0.5 rounded text-white">BÊTA</span>
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate-300">Conseil GymFlow</span>
                                </div>
                                <p className="font-bold text-lg leading-snug mb-2">
                                    Pic d'affluence prévu jusqu'à <span className="text-blue-400">19h15</span>.
                                </p>
                                <div className="flex items-center gap-3 text-sm text-slate-300 bg-white/10 p-2 rounded-lg">
                                    <i className="fas fa-lightbulb text-yellow-400"></i>
                                    <span>Optimisez votre séance : commencez par les machines guidées.</span>
                                </div>
                            </div>
                            {/* Décoration background */}
                            <div className="absolute -right-6 -bottom-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-30"></div>
                        </div>
                    </div>

                </div>

                {/* TAB BAR */}
                <div className="bg-white border-t border-gray-100 h-24 px-8 flex justify-between items-start pt-4 absolute bottom-0 w-full z-20">
                    <button className="flex flex-col items-center gap-1 text-blue-600">
                        <i className="fas fa-home text-xl"></i>
                        <span className="text-[10px] font-bold">Accueil</span>
                    </button>
                    <button className="flex flex-col items-center justify-center -mt-8">
                        <div className="w-14 h-14 bg-slate-900 rounded-2xl shadow-lg shadow-slate-400/50 flex items-center justify-center text-white text-xl transform active:scale-95 transition hover:rotate-90 duration-300">
                            <i className="fas fa-qrcode"></i>
                        </div>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-slate-600 transition">
                        <i className="fas fa-user text-xl"></i>
                        <span className="text-[10px] font-bold">Profil</span>
                    </button>
                </div>

                <button
                    onClick={onBack}
                    className="absolute top-3 right-3 z-50 bg-black/80 text-white px-3 py-1.5 rounded-full text-xs hover:bg-black backdrop-blur-md font-bold"
                >
                    X Fermer
                </button>

            </div>
        </div>
    )
}

// --- LANDING PAGE B2B ---
function App() {
    const [currentView, setCurrentView] = useState('landing')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [formStep, setFormStep] = useState(1) // 1 = Form, 2 = Success

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
        setFormStep(1) // Reset quand on ferme
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // SIMULATION DE COLLECTE DE DONNÉE RÉUSSIE
        // 1. On montre le succès à l'utilisateur pour l'UX
        setFormStep(2)

        // 2. (OPTIONNEL) On ouvre le vrai formulaire Tally dans un nouvel onglet pour que tu aies la data
        // Décommente la ligne ci-dessous et mets ton lien si tu veux vraiment recevoir le lead
        // setTimeout(() => window.open('https://tally.so/r/TON_LIEN', '_blank'), 1500)
    }

    if (currentView === 'app') {
        return <MobileApp onBack={() => setCurrentView('landing')} />
    }

    return (
        <div className="font-sans text-slate-800 antialiased bg-white scroll-smooth selection:bg-blue-100">

            {/* NAVBAR */}
            <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 fixed w-full z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">

                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
                            {/* LOGO PLACEHOLDER */}
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 group-hover:scale-110 transition duration-300">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <span className="text-2xl font-bold text-slate-900 tracking-tight">GymFlow</span>
                        </div>

                        <div className="hidden md:flex space-x-10 text-sm font-semibold">
                            <a href="#problem" className="text-slate-500 hover:text-blue-600 transition">Notre Mission</a>
                            <a href="#solution" className="text-slate-500 hover:text-blue-600 transition">Le Capteur</a>
                            <a href="#pricing" className="text-slate-500 hover:text-blue-600 transition">Offre Starter</a>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentView('app')}
                                className="hidden md:flex items-center gap-2 text-slate-600 font-bold text-sm hover:text-blue-600 transition bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 hover:border-blue-200"
                            >
                                <i className="fas fa-mobile-alt"></i> App Membre
                            </button>
                            <button
                                onClick={toggleModal}
                                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Démo Gérant
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-8 border border-blue-100 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
                            Nouvelle Technologie pour Indépendants
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
                            Ne laissez plus vos abonnés partir chez <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Basic-Fit.</span>
                        </h1>
                        <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto">
                            La technologie des géants, enfin accessible. Installez notre capteur en 5 minutes. Offrez à vos membres le confort qu'ils méritent.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={toggleModal}
                                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition transform hover:-translate-y-1"
                            >
                                Commander mon capteur
                            </button>
                            <button
                                onClick={() => setCurrentView('app')}
                                className="px-8 py-4 rounded-xl font-bold text-lg text-slate-600 hover:bg-white hover:text-blue-600 transition border-2 border-slate-200 hover:border-blue-100 flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-play-circle"></i> Voir la Démo Live
                            </button>
                        </div>

                        <p className="mt-8 text-sm text-slate-400 flex items-center justify-center gap-6">
                            <span><i className="fas fa-check text-green-500 mr-2"></i>Installation Plug & Play</span>
                            <span><i className="fas fa-check text-green-500 mr-2"></i>Compatible toutes salles</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* ARGUMENTS (PAIN POINTS REDDIT) */}
            <section id="problem" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Pourquoi perd-on des adhérents ?</h2>
                        <p className="mt-4 text-slate-600 text-lg">L'analyse de 500+ avis clients révèle 3 frustrations majeures.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 group">
                            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition"><i className="fas fa-users-slash"></i></div>
                            <h3 className="text-xl font-bold mb-3">Saturation (Effet Sardine)</h3>
                            <p className="text-slate-500 leading-relaxed">Attendre 10 min pour un banc est la cause #1 de résiliation. GymFlow lisse votre fréquentation naturellement.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 group">
                            <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition"><i className="fas fa-wifi"></i></div>
                            <h3 className="text-xl font-bold mb-3">Pannes & Bugs</h3>
                            <p className="text-slate-500 leading-relaxed">Vos logiciels actuels plantent ? Notre technologie <strong>"Offline First"</strong> continue de compter même sans internet.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 group">
                            <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition"><i className="fas fa-user-shield"></i></div>
                            <h3 className="text-xl font-bold mb-3">100% Privacy (RGPD)</h3>
                            <p className="text-slate-500 leading-relaxed">Vos membres détestent être filmés. Notre IA compte des silhouettes anonymes, pas des visages. 0 image stockée.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING & HARDWARE */}
            <section id="pricing" className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white overflow-hidden relative shadow-2xl">

                        {/* Visual Background Effect */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

                        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                            <div className="text-left">
                                <div className="inline-block bg-blue-900/50 border border-blue-500/30 text-blue-300 px-4 py-1 rounded-full text-xs font-bold uppercase mb-6">
                                    Offre de lancement
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Moins de 3€ / jour.<br/>Rentable dès le 1er mois.</h2>
                                <p className="text-slate-400 mb-10 text-lg">Arrêtez d'investir dans des portiques à 10 000€. Passez au modèle SaaS.</p>

                                <div className="flex items-center gap-6 mb-10 bg-white/5 p-6 rounded-2xl border border-white/10 w-fit">
                                    <div className="text-5xl font-bold text-white tracking-tighter">
                                        89€ <span className="text-sm font-normal text-slate-400">/mois</span>
                                    </div>
                                    <div className="h-12 w-px bg-white/10"></div>
                                    <div>
                                        <div className="font-bold text-lg text-blue-400">Tout illimité</div>
                                        <div className="text-slate-400 text-sm">Sans engagement</div>
                                    </div>
                                </div>

                                <ul className="flex flex-col gap-4 text-slate-300 mb-10">
                                    <li className="flex items-center gap-3"><i className="fas fa-check-circle text-green-400 text-xl"></i> <span>Capteur IoT IA inclus (Garantie à vie)</span></li>
                                    <li className="flex items-center gap-3"><i className="fas fa-check-circle text-green-400 text-xl"></i> <span>App membres & Dashboard Gérant</span></li>
                                    <li className="flex items-center gap-3"><i className="fas fa-check-circle text-green-400 text-xl"></i> <span>Support technique dédié</span></li>
                                </ul>

                                <button
                                    onClick={toggleModal}
                                    className="w-full md:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/50 text-lg"
                                >
                                    Equiper ma salle maintenant
                                </button>
                            </div>

                            {/* HARDWARE VISUAL */}
                            <div className="flex flex-col items-center">
                                <div className="relative group cursor-pointer">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
                                    {/* PLACEHOLDER DU CAPTEUR (IMAGE IA) */}
                                    <img
                                        src="https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=600&q=80"
                                        alt="Capteur GymFlow"
                                        className="relative w-72 h-72 object-cover rounded-[2rem] shadow-2xl border-4 border-slate-800 transform group-hover:scale-105 transition duration-500 z-10"
                                    />
                                    {/* Petit badge technique */}
                                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full border border-white/10 shadow-xl z-20 flex items-center gap-2 whitespace-nowrap">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        IA Active • WiFi
                                    </div>
                                </div>
                                <p className="mt-8 text-sm text-slate-500 italic text-center max-w-xs">
                                    "Le boîtier est discret, s'installe avec un simple adhésif industriel et se connecte en 30 secondes."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center opacity-60">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <i className="fas fa-chart-line"></i>
                        <span className="font-bold">GymFlow</span>
                    </div>
                    <p className="text-sm">© 2025 GymFlow. Tech for Good Project.</p>
                </div>
            </footer>

            {/* MODAL DE CONTACT B2B */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative overflow-hidden">

                        <button onClick={toggleModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition z-10">
                            <i className="fas fa-times"></i>
                        </button>

                        {formStep === 1 ? (
                            <form onSubmit={handleSubmit} className="relative z-10">
                                <div className="mb-8 text-center">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                                        <i className="fas fa-rocket"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Demander une démo</h3>
                                    <p className="text-slate-500 mt-2 text-sm">Nous configurons votre compte en 24h.</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nom de votre salle</label>
                                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" placeholder="Ex: Iron Gym Nantes" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email pro</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none transition font-medium" placeholder="gerant@irongym.com" required />
                                    </div>
                                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 transform active:scale-95 mt-4">
                                        Valider ma demande
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-10 animate-fade-in-up">
                                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                                    <i className="fas fa-check"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Demande reçue !</h3>
                                <p className="text-slate-500 mb-8">Un expert GymFlow va vous contacter sur <strong>{email}</strong> dans l'heure.</p>
                                <button onClick={toggleModal} className="text-blue-600 font-bold hover:underline">Fermer la fenêtre</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App