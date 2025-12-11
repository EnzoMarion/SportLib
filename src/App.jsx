import { useState, useEffect } from 'react'

// --- DONNÉES GRENOBLE (Salles Réelles) ---
const GYM_DATA = [
    {
        id: 1,
        name: "On Air Grenoble",
        city: "Echirolles",
        desc: "L'espace sport & musique. Ambiance underground, DJ sets et machines haut de gamme.",
        tags: ["Muscu", "Boxe", "Cardio"],
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        isPromoted: true,
        features: ["DJ Live", "Espace Femme", "Ring"],
        nextSlots: [
            { id: 101, time: "18:00", activity: "Boxe Training", spots: 4, price: 15, promo: null },
            { id: 102, time: "19:30", activity: "Plateau Muscu", spots: 0, price: 10, promo: null },
            { id: 103, time: "21:00", activity: "Late Night", spots: 12, price: 8, promo: "-50%" },
        ]
    },
    {
        id: 2,
        name: "Wellness Sport Club",
        city: "Grenoble Centre",
        desc: "Club premium avec piscine et spa. Le sport version bien-être.",
        tags: ["Piscine", "Yoga", "Premium"],
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80",
        isPromoted: true,
        features: ["Piscine", "Sauna/Hammam", "Cours Co"],
        nextSlots: [
            { id: 201, time: "17:15", activity: "Aquabike", spots: 2, price: 25, promo: "-20%" },
            { id: 202, time: "18:30", activity: "Pilates", spots: 1, price: 20, promo: null },
        ]
    },
    {
        id: 3,
        name: "CrossFit des Allobroges",
        city: "Saint-Martin-d'Hères",
        desc: "La box de référence. Communauté forte, coaching pointu, résultats garantis.",
        tags: ["CrossFit", "Intense"],
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1517963879466-e925ac69aa18?auto=format&fit=crop&w=600&q=80",
        isPromoted: false,
        features: ["WOD", "Haltéro", "Gym"],
        nextSlots: [
            { id: 301, time: "12:15", activity: "WOD Midi", spots: 5, price: 20, promo: null },
            { id: 302, time: "19:00", activity: "Skill Gym", spots: 3, price: 20, promo: null },
        ]
    },
    {
        id: 4,
        name: "Keepcool Victor Hugo",
        city: "Grenoble Centre",
        desc: "Le sport sans la frime. Cadre moderne et décontracté.",
        tags: ["Cardio", "Santé"],
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=600&q=80",
        isPromoted: false,
        features: ["Coach", "Douches indiv.", "7j/7"],
        nextSlots: [
            { id: 401, time: "18:00", activity: "Circuit Training", spots: 8, price: 12, promo: "-30%" },
            { id: 402, time: "19:00", activity: "Renfo", spots: 4, price: 12, promo: null },
        ]
    }
]

// --- COMPOSANT : DÉTAIL SALLE (SCREEN 2) ---
const GymDetailScreen = ({ gym, onBack }) => {
    const [activeTab, setActiveTab] = useState('slots') // slots, infos
    const [bookedSlot, setBookedSlot] = useState(null)

    const handleBook = (slotId) => {
        setBookedSlot(slotId)
        setTimeout(() => alert("Réservation confirmée ! Vous avez reçu un email."), 500)
    }

    return (
        <div className="flex flex-col h-full bg-white animate-fade-in relative font-['Poppins']">
            {/* Header Image */}
            <div className="h-48 relative shrink-0">
                <img src={gym.image} className="w-full h-full object-cover" alt={gym.name} />
                <button onClick={onBack} className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#7603a9] transition z-20 shadow-lg">
                    <i className="fas fa-arrow-left"></i>
                </button>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent pt-12 pb-4 px-6 text-white">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="bg-[#7603a9] text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block">Partenaire Officiel</span>
                            <h2 className="text-xl font-extrabold leading-tight">{gym.name}</h2>
                            <p className="text-xs text-gray-200 font-medium"><i className="fas fa-map-marker-alt mr-1 text-[#fea851]"></i> {gym.city}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-lg p-1.5 border border-white/20">
                            <span className="text-lg font-bold text-[#fea851]">★ {gym.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
                <button onClick={() => setActiveTab('slots')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition ${activeTab === 'slots' ? 'border-[#7603a9] text-[#7603a9]' : 'border-transparent text-gray-400 hover:text-slate-600'}`}>
                    Planning & Offres
                </button>
                <button onClick={() => setActiveTab('infos')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition ${activeTab === 'infos' ? 'border-[#7603a9] text-[#7603a9]' : 'border-transparent text-gray-400 hover:text-slate-600'}`}>
                    Infos
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 bg-gray-50 no-scrollbar">

                {activeTab === 'slots' && (
                    <div className="space-y-4">
                        {/* Last Minute Alert */}
                        {gym.nextSlots.some(s => s.promo) && (
                            <div className="bg-gradient-to-r from-[#fea851] to-orange-400 rounded-xl p-3 text-white shadow-md flex items-center justify-between animate-pulse-slow">
                                <div>
                                    <p className="font-bold text-sm flex items-center gap-2"><i className="fas fa-bolt"></i> Offres Flash</p>
                                    <p className="text-[10px] opacity-90">Créneaux de ce soir à prix réduit.</p>
                                </div>
                                <span className="text-xl font-bold bg-white/20 px-2 py-1 rounded">-50%</span>
                            </div>
                        )}

                        <div>
                            <h3 className="font-bold text-slate-900 text-sm mb-3">Créneaux disponibles</h3>
                            <div className="space-y-3">
                                {gym.nextSlots.map((slot) => (
                                    <div key={slot.id} className={`bg-white p-3 rounded-xl border flex justify-between items-center transition ${slot.spots === 0 ? 'opacity-60 border-gray-100 grayscale' : 'border-gray-200 shadow-sm hover:border-[#7603a9] cursor-pointer'}`}>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">{slot.time}</span>
                                                <span className="font-bold text-slate-900 text-sm">{slot.activity}</span>
                                            </div>
                                            <div className="mt-1">
                                                {slot.spots === 0 ? (
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Complet</span>
                                                ) : (
                                                    <span className={`text-[10px] font-bold ${slot.spots < 3 ? 'text-[#fea851]' : 'text-green-600'}`}>
                                                {slot.spots} places restantes
                                            </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {slot.promo ? (
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] text-gray-400 line-through">{slot.price}€</span>
                                                    <span className="text-[#fea851] font-bold text-base">{Math.round(slot.price * 0.5)}€</span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-900 font-bold text-base">{slot.price}€</span>
                                            )}

                                            {bookedSlot === slot.id ? (
                                                <button className="text-[10px] font-bold uppercase py-1.5 px-4 rounded-lg bg-green-500 text-white flex items-center gap-1">
                                                    <i className="fas fa-check"></i> Réservé
                                                </button>
                                            ) : (
                                                <button
                                                    disabled={slot.spots === 0}
                                                    onClick={() => handleBook(slot.id)}
                                                    className={`mt-1 w-full text-[10px] font-bold uppercase py-1 px-3 rounded-full transition ${slot.spots === 0 ? 'bg-gray-200 text-gray-400' : 'bg-[#7603a9] text-white hover:bg-purple-800'}`}
                                                >
                                                    Réserver
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'infos' && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm mb-1">À propos</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{gym.desc}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm mb-2">Services</h3>
                            <div className="flex flex-wrap gap-2">
                                {gym.features.map(feat => (
                                    <span key={feat} className="bg-purple-50 text-[#7603a9] px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-purple-100">
                                <i className="fas fa-check text-[8px]"></i> {feat}
                            </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// --- COMPOSANT : EXPLORE (LISTE + RECHERCHE) ---
const ExploreScreen = ({ onSelectGym }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [category, setCategory] = useState("Tout")

    const filteredGyms = GYM_DATA.filter(gym => {
        const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) || gym.city.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = category === "Tout" || gym.tags.includes(category)
        return matchesSearch && matchesCategory
    })

    return (
        <div className="flex flex-col h-full bg-gray-50 font-['Poppins']">
            {/* Header Sticky */}
            <div className="bg-white px-5 pt-12 pb-2 sticky top-0 z-20 shadow-sm">
                <h1 className="text-xl font-extrabold text-slate-900 mb-3">Trouver une séance</h1>

                {/* Search Bar */}
                <div className="relative mb-3">
                    <i className="fas fa-search absolute left-4 top-3 text-gray-400 text-sm"></i>
                    <input
                        type="text"
                        placeholder="Rechercher (On Air, Yoga...)"
                        className="w-full bg-gray-100 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#7603a9] font-medium text-sm transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Category Pills */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {['Tout', 'Muscu', 'CrossFit', 'Yoga', 'Piscine', 'Premium'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-bold transition border ${category === cat ? 'bg-[#7603a9] text-white border-[#7603a9]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#7603a9]'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                {filteredGyms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <i className="fas fa-search text-3xl mb-2 opacity-50"></i>
                        <p className="text-sm">Aucune salle trouvée.</p>
                    </div>
                ) : (
                    filteredGyms.map(gym => (
                        <div key={gym.id} onClick={() => onSelectGym(gym)} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition cursor-pointer group transform hover:-translate-y-0.5">
                            <div className="h-28 relative">
                                <img src={gym.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={gym.name} />
                                <div className="absolute top-2 left-2 flex gap-1">
                                    {gym.isPromoted && (
                                        <span className="bg-[#7603a9]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm border border-white/20">
                                            PARTENAIRE
                                        </span>
                                    )}
                                    {gym.nextSlots.some(s => s.promo) && (
                                        <span className="bg-[#fea851]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm animate-pulse flex items-center gap-1">
                                            <i className="fas fa-bolt text-[8px]"></i> -50%
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-slate-900 text-sm truncate pr-2">{gym.name}</h3>
                                    <span className="text-[10px] font-bold text-[#fea851] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">★ {gym.rating}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mb-2 truncate flex items-center gap-1">
                                    <i className="fas fa-map-pin"></i> {gym.city}
                                </p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {gym.tags.map(t => <span key={t} className="text-[9px] bg-slate-50 text-slate-600 border border-slate-100 px-1.5 py-0.5 rounded font-medium">{t}</span>)}
                                </div>

                                <div className="bg-slate-50 rounded-lg p-2 flex items-center justify-between border border-slate-100 group-hover:border-purple-200 transition">
                                    <span className="text-[10px] font-bold text-slate-700 truncate max-w-[120px]">Prochain : {gym.nextSlots[0].activity}</span>
                                    <span className="text-[10px] font-bold text-[#7603a9] bg-purple-100/50 px-2 py-0.5 rounded">
                                        dès {gym.nextSlots.some(s => s.promo) ? Math.round(gym.nextSlots[0].price * 0.5) : gym.nextSlots[0].price}€
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

// --- COMPOSANT : CONTENEUR MOBILE (RESPONSIVE FIX & CLAIR) ---
const MobileApp = ({ onBack }) => {
    const [selectedGym, setSelectedGym] = useState(null)
    const [activeTab, setActiveTab] = useState('explore')

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        setSelectedGym(null)
    }

    return (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in font-['Poppins']">

            {/* TÉLÉPHONE */}
            <div className="w-full max-w-[420px] h-[95vh] max-h-[850px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-slate-900 flex flex-col transform transition-all ring-8 ring-slate-800/50">

                {/* Status Bar */}
                <div className="absolute top-0 inset-x-0 h-8 bg-white z-50 flex justify-between items-center px-6 text-xs font-bold text-gray-900 pointer-events-none">
                    <span>18:42</span>
                    <div className="flex gap-1"><i className="fas fa-signal"></i><i className="fas fa-wifi"></i><i className="fas fa-battery-full"></i></div>
                </div>

                {/* Main Content Switch */}
                <div className="flex-1 overflow-hidden relative bg-gray-50 pt-6">
                    {selectedGym ? (
                        <GymDetailScreen gym={selectedGym} onBack={() => setSelectedGym(null)} />
                    ) : activeTab === 'pass' ? (
                        // ECRAN PASS "AVANTAGES" (Couleurs Mises à jour)
                        <div className="flex flex-col h-full pt-12 px-6 bg-white animate-fade-in">
                            <h1 className="text-xl font-extrabold text-slate-900 mb-4">Mon Compte Gymity</h1>
                            <div className="bg-gradient-to-br from-[#7603a9] to-purple-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden mb-6">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-[10px] text-purple-200 uppercase font-bold tracking-widest">Statut Membre</p>
                                        <p className="text-xl font-bold mt-1">Pass Activé ✅</p>
                                    </div>
                                    <i className="fas fa-id-card-alt text-3xl text-purple-300"></i>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-purple-200 mb-1">Offres disponibles</p>
                                        <p className="text-2xl font-bold">12 <span className="text-xs font-normal text-purple-200">partenaires</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-[#fea851] font-bold bg-[#fea851]/10 px-2 py-1 rounded border border-[#fea851]/20">
                                            Compte Gratuit
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-900 text-sm mb-3">Vos avantages exclusifs</h3>
                            <div className="space-y-3 overflow-y-auto pb-20 no-scrollbar">
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-purple-100 text-[#7603a9] rounded-full flex items-center justify-center font-bold text-sm">W</div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-slate-900">Wellness Sport Club</p>
                                        <p className="text-xs text-green-600 font-bold">1 Séance d'essai offerte</p>
                                    </div>
                                    <button className="text-[10px] bg-[#7603a9] text-white px-3 py-1.5 rounded-lg font-bold">Activer</button>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-orange-100 text-[#fea851] rounded-full flex items-center justify-center font-bold text-sm">C</div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-slate-900">CrossFit Allobroges</p>
                                        <p className="text-xs text-slate-500">-50% sur la séance découverte</p>
                                    </div>
                                    <button className="text-[10px] bg-[#7603a9] text-white px-3 py-1.5 rounded-lg font-bold">Profiter</button>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-center opacity-60 grayscale">
                                    <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center font-bold text-sm">K</div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-slate-500">Keepcool Victor Hugo</p>
                                        <p className="text-xs text-gray-400">Déjà utilisé</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold"><i className="fas fa-check"></i></span>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'flash' ? (
                        // ECRAN FLASH (Offres Last Minute - Couleurs Orange)
                        <div className="flex flex-col h-full pt-12 px-6 bg-white animate-fade-in">
                            <h1 className="text-xl font-extrabold text-slate-900 mb-2">Offres Last-Minute <span className="text-xl">🔥</span></h1>
                            <p className="text-xs text-gray-500 mb-4">Prix cassés pour ce soir.</p>
                            <div className="space-y-3">
                                {GYM_DATA.map(gym => (
                                    gym.nextSlots.some(s => s.promo) && (
                                        <div key={gym.id} className="bg-white p-3 rounded-xl border border-orange-100 shadow-sm flex justify-between items-center cursor-pointer hover:shadow-md transition" onClick={() => setSelectedGym(gym)}>
                                            <div className="flex items-center gap-3">
                                                <img src={gym.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">{gym.name}</p>
                                                    <p className="text-[10px] text-gray-500">{gym.city}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="bg-[#fea851] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">-50%</span>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ) : (
                        <ExploreScreen onSelectGym={setSelectedGym} />
                    )}
                </div>

                {/* Bottom Navigation (COULEURS CORRIGÉES) */}
                <div className="bg-white h-20 border-t border-gray-100 flex justify-around items-center pb-2 z-40 relative shrink-0">
                    <button onClick={() => handleTabChange('explore')} className={`flex flex-col items-center gap-1 w-16 transition ${activeTab === 'explore' ? 'text-[#7603a9] scale-105' : 'text-gray-300 hover:text-gray-500'}`}>
                        <i className="fas fa-search text-lg"></i><span className="text-[10px] font-bold">Explorer</span>
                    </button>
                    <button onClick={() => handleTabChange('flash')} className={`flex flex-col items-center gap-1 w-16 transition ${activeTab === 'flash' ? 'text-[#fea851] scale-105' : 'text-gray-300 hover:text-gray-500'}`}>
                        <i className="fas fa-bolt text-lg"></i><span className="text-[10px] font-bold">Flash</span>
                    </button>
                    <button onClick={() => handleTabChange('pass')} className={`flex flex-col items-center gap-1 w-16 transition ${activeTab === 'pass' ? 'text-slate-900 scale-105' : 'text-gray-300 hover:text-gray-500'}`}>
                        <i className="fas fa-id-card text-lg"></i><span className="text-[10px] font-bold">Pass</span>
                    </button>
                </div>

                {/* Close Demo Button */}
                <button onClick={onBack} className="absolute top-12 right-4 z-50 bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#fea851] transition shadow-lg backdrop-blur-md">
                    <i className="fas fa-times"></i>
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
    const [gymName, setGymName] = useState("")
    const [formStep, setFormStep] = useState(1)

    const toggleModal = () => { setIsModalOpen(!isModalOpen); setFormStep(1) }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormStep(2)
    }

    return (
        <div className="font-sans text-slate-800 antialiased bg-white scroll-smooth selection:bg-purple-100 font-['Poppins']">

            {/* APP DEMO */}
            {currentView === 'app' && <MobileApp onBack={() => setCurrentView('landing')} />}

            {/* NAVBAR */}
            <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 fixed w-full z-40 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        {/* LOGO & NOM */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                            <img src="public/Logo.svg" alt="Gymity Logo" className="w-10 h-10 object-contain" />
                            <span className="text-2xl font-bold text-slate-900 tracking-tight">Gymity</span>
                        </div>

                        {/* NAVIGATION B2B */}
                        <div className="hidden md:flex space-x-8 text-sm font-semibold">
                            <a href="#vision" className="text-slate-500 hover:text-[#7603a9] transition">Notre Vision</a>
                            <a href="#solution" className="text-slate-500 hover:text-[#7603a9] transition">La Solution</a>
                            <a href="#pricing" className="text-slate-500 hover:text-[#7603a9] transition">Offres Pro</a>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setCurrentView('app')} className="hidden md:flex items-center gap-2 text-slate-600 font-bold text-sm hover:text-[#7603a9] transition bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 hover:border-purple-200">
                                <i className="fas fa-mobile-alt"></i> Voir la Démo
                            </button>
                            <button onClick={toggleModal} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Inscrire ma salle
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION (VISION) - ID Ajouté pour le menu */}
            <section id="vision" className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-[#7603a9] text-xs font-bold uppercase tracking-wide mb-8 border border-purple-100">
                            <span className="w-2 h-2 rounded-full bg-[#7603a9]"></span>
                            Pour Salles & Studios Indépendants
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                            Remplissez vos créneaux vides. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7603a9] to-[#fea851]">Automatiquement.</span>
                        </h1>
                        <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto">
                            La plateforme locale qui connecte vos heures creuses aux sportifs du quartier.
                            Visibilité, Remplissage, Croissance. Sans effort.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                            <button onClick={toggleModal} className="bg-[#7603a9] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-purple-200 hover:bg-purple-800 transition transform hover:-translate-y-1">
                                Devenir Partenaire
                            </button>
                            <button onClick={() => setCurrentView('app')} className="px-8 py-4 rounded-xl font-bold text-lg text-slate-600 hover:bg-white hover:text-[#7603a9] transition border-2 border-slate-200 hover:border-purple-100 flex items-center justify-center gap-2">
                                <i className="fas fa-play-circle"></i> Démo Application
                            </button>
                        </div>

                        {/* DOWNLOAD BADGES */}
                        <div className="flex justify-center gap-4 opacity-70 hover:opacity-100 transition cursor-default">
                            <div className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                                <i className="fab fa-apple text-xl mr-2"></i>
                                <div className="text-left">
                                    <div className="text-[9px] uppercase">Télécharger sur</div>
                                    <div className="text-xs font-bold leading-none">App Store</div>
                                </div>
                            </div>
                            <div className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                                <i className="fab fa-google-play text-xl mr-2"></i>
                                <div className="text-left">
                                    <div className="text-[9px] uppercase">Télécharger sur</div>
                                    <div className="text-xs font-bold leading-none">Google Play</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOLUTION / PILIERS */}
            <section id="solution" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">4 Piliers pour votre croissance</h2>
                        <p className="mt-4 text-slate-600">Plus qu'un annuaire, un outil de Yield Management.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-purple-50 text-[#7603a9] rounded-xl flex items-center justify-center text-2xl mb-4"><i className="fas fa-map-marked-alt"></i></div>
                            <h3 className="font-bold text-lg mb-2">Visibilité Locale</h3>
                            <p className="text-sm text-slate-500">Une carte interactive unique regroupant tous les indépendants de la ville.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-2xl mb-4"><i className="fas fa-calendar-check"></i></div>
                            <h3 className="font-bold text-lg mb-2">Temps Réel</h3>
                            <p className="text-sm text-slate-500">Affichage des places restantes en direct pour créer un sentiment d'urgence.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-orange-50 text-[#fea851] rounded-xl flex items-center justify-center text-2xl mb-4"><i className="fas fa-bolt"></i></div>
                            <h3 className="font-bold text-lg mb-2">Offres Flash</h3>
                            <p className="text-sm text-slate-500">Remplissez vos heures creuses avec des remises "Last Minute" automatisées.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center text-2xl mb-4"><i className="fas fa-id-card-alt"></i></div>
                            <h3 className="font-bold text-lg mb-2">Pass Découverte</h3>
                            <p className="text-sm text-slate-500">Un mécanisme puissant pour faire tester votre salle à de nouveaux prospects.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Des offres adaptées à votre maturité</h2>
                        <p className="mt-4 text-slate-600">Choisissez le niveau d'accompagnement qu'il vous faut.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* OFFRE 1 */}
                        <div className="border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Visibilité</h3>
                            <p className="text-sm text-slate-500 mb-6">Pour être trouvé facilement.</p>
                            <div className="text-3xl font-bold mb-6">29€ <span className="text-sm font-normal text-slate-400">/mois</span></div>
                            <ul className="space-y-3 text-sm text-slate-600 mb-8">
                                <li className="flex gap-2"><i className="fas fa-check text-green-500"></i> Fiche Salle Complète</li>
                                <li className="flex gap-2"><i className="fas fa-check text-green-500"></i> Présence sur la Carte</li>
                                <li className="flex gap-2"><i className="fas fa-check text-green-500"></i> Lien vers votre site</li>
                            </ul>
                            <button onClick={toggleModal} className="w-full py-3 rounded-xl border-2 border-slate-900 font-bold hover:bg-slate-50 transition">Choisir</button>
                        </div>

                        {/* OFFRE 2 (HERO) */}
                        <div className="border-2 border-[#7603a9] bg-slate-900 text-white rounded-3xl p-8 shadow-2xl transform md:-translate-y-4 relative">
                            <div className="absolute top-0 right-0 bg-[#7603a9] text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">RECOMMANDÉ</div>
                            <h3 className="text-xl font-bold mb-2">Remplissage</h3>
                            <p className="text-purple-200 text-sm mb-6">Pour combler vos heures creuses.</p>
                            <div className="text-3xl font-bold mb-6">79€ <span className="text-sm font-normal text-slate-400">/mois</span></div>
                            <ul className="space-y-3 text-sm text-slate-300 mb-8">
                                <li className="flex gap-2"><i className="fas fa-check text-[#fea851]"></i> Tout du pack Visibilité</li>
                                <li className="flex gap-2"><i className="fas fa-check text-[#fea851]"></i> Planning Intégré</li>
                                <li className="flex gap-2"><i className="fas fa-check text-[#fea851]"></i> Affichage places restantes</li>
                                <li className="flex gap-2"><i className="fas fa-check text-[#fea851]"></i> <strong>Offres Flash (Last Minute)</strong></li>
                            </ul>
                            <button onClick={toggleModal} className="w-full py-3 rounded-xl bg-[#7603a9] font-bold hover:bg-purple-800 transition">Commencer</button>
                        </div>

                        {/* OFFRE 3 */}
                        <div className="border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Croissance</h3>
                            <p className="text-sm text-slate-500 mb-6">Pour accélérer votre acquisition.</p>
                            <div className="text-3xl font-bold mb-6">149€ <span className="text-sm font-normal text-slate-400">/mois</span></div>
                            <ul className="space-y-3 text-sm text-slate-600 mb-8">
                                <li className="flex gap-2"><i className="fas fa-check text-green-500"></i> Tout du pack Remplissage</li>
                                <li className="flex gap-2"><i className="fas fa-check text-green-500"></i> Statistiques avancées</li>
                                <li className="flex gap-2"><i className="fas fa-check text-green-500"></i> Mise en avant prioritaire</li>
                                <li className="flex gap-2"><i className="fas fa-check text-green-500"></i> Outils de relance auto</li>
                            </ul>
                            <button onClick={toggleModal} className="w-full py-3 rounded-xl border-2 border-slate-900 font-bold hover:bg-slate-50 transition">Contacter</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-50 border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center opacity-60">
                    <div className="flex items-center gap-2 mb-4 md:mb-0"><img src="public/Logo.svg" alt="Logo" className="w-5 h-5" /><span className="font-bold">Gymity</span></div>
                    <p className="text-sm">© 2025 Gymity. Tech for Good Project.</p>
                </div>
            </footer>

            {/* MODAL CONTACT */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
                        <button onClick={toggleModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><i className="fas fa-times text-xl"></i></button>
                        {formStep === 1 ? (
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Rejoindre Gymity</h3>
                                <input type="text" value={gymName} onChange={e => setGymName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-4" placeholder="Nom de votre salle" required />
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-4" placeholder="Email pro" required />
                                <button type="submit" className="w-full bg-[#7603a9] text-white font-bold py-4 rounded-xl hover:bg-purple-800 transition">Demander un accès</button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"><i className="fas fa-check"></i></div>
                                <h3 className="font-bold text-xl mb-2">Demande envoyée !</h3>
                                <p className="text-gray-500 text-sm">Nous allons référencer {gymName} rapidement.</p>
                                <button onClick={toggleModal} className="mt-6 text-[#7603a9] font-bold text-sm">Fermer</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App