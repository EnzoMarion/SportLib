import { useState } from 'react'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formStep, setFormStep] = useState(1) // 1 = Form, 2 = Success

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
        if (!isModalOpen) setFormStep(1) // Reset quand on ouvre
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormStep(2) // Affiche le message de succès
    }

    return (
        <div className="font-sans text-gray-800 antialiased">

            {/* NAVIGATION */}
            <nav className="bg-white shadow-sm fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <span className="text-2xl font-bold text-indigo-600">
                <i className="fas fa-running mr-2"></i>SportLib
              </span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#concept" className="text-gray-500 hover:text-indigo-600 transition">Le Concept</a>
                            <a href="#how" className="text-gray-500 hover:text-indigo-600 transition">Comment ça marche</a>
                            <a href="#pricing" className="text-gray-500 hover:text-indigo-600 transition">Tarifs</a>
                        </div>
                        <div>
                            <button
                                onClick={toggleModal}
                                className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition shadow-lg transform hover:-translate-y-0.5"
                            >
                                Lancer l'app
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-indigo-600 to-cyan-500 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                        <div className="mb-12 lg:mb-0">
                            <div className="inline-block bg-indigo-800 bg-opacity-30 rounded-full px-4 py-1 mb-6 border border-indigo-400">
                                <span className="text-cyan-300 font-semibold text-sm tracking-wide uppercase">Nouveau Concept</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
                                Testez tous les sports.<br />
                                <span className="text-cyan-300">Ne vous mariez avec aucun.</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-indigo-100 mb-8 max-w-lg">
                                L'abonnement flexible à 25€/mois pour découvrir des clubs à moins de 15 min de chez vous. Sans engagement annuel.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={toggleModal}
                                    className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transition transform hover:scale-105"
                                >
                                    Trouver mon sport idéal
                                </button>
                            </div>
                            <div className="mt-8 flex items-center text-sm text-indigo-200">
                                <p>✅ Déjà 150+ testeurs actifs</p>
                            </div>
                        </div>

                        {/* Image / Illustration */}
                        <div className="relative hidden lg:block">
                            <img
                                className="rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500 w-full object-cover h-[500px]"
                                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Sport entre amis"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION PROBLEME */}
            <section id="concept" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Pourquoi c'est compliqué de se mettre au sport ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "fa-wallet", color: "text-red-600", bg: "bg-red-100", title: "L'engagement coûteux", text: "Payer 400€ à l'année pour abandonner en novembre ? Non merci." },
                            { icon: "fa-map-marker-alt", color: "text-orange-600", bg: "bg-orange-100", title: "La distance", text: "La motivation s'arrête là où le trajet dépasse 20 min." },
                            { icon: "fa-user-slash", color: "text-blue-600", bg: "bg-blue-100", title: "La solitude", text: "Aller seul dans un nouveau club, c'est intimidant." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                                <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-6`}>
                                    <i className={`fas ${item.icon}`}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION DEMO MOCKUP */}
            <section id="how" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        {/* Mockup CSS Phone */}
                        <div className="relative mx-auto lg:mx-0 w-72 h-[550px] border-[12px] border-gray-800 rounded-[40px] overflow-hidden shadow-2xl bg-white mb-12 lg:mb-0">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
                            <div className="h-full w-full bg-gray-100 flex flex-col pt-12">
                                <div className="bg-white p-6 shadow-sm">
                                    <p className="text-xs text-gray-500 uppercase">Mon Solde</p>
                                    <div className="flex justify-between items-end">
                                        <h3 className="text-2xl font-bold text-indigo-600">3 Crédits</h3>
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Actif</span>
                                    </div>
                                </div>
                                <div className="flex-1 bg-blue-50 relative p-4">
                                    {/* Fake Pins */}
                                    <div className="absolute top-10 left-10 bg-white p-2 rounded-lg shadow-md text-xs z-10">
                                        <i className="fas fa-dumbbell text-indigo-500"></i> Fitness Park <span className="text-gray-400 block">0.5km</span>
                                    </div>
                                    <div className="absolute top-32 right-8 bg-white p-2 rounded-lg shadow-md text-xs z-10">
                                        <i className="fas fa-swimmer text-blue-500"></i> Piscine O. <span className="text-gray-400 block">1.2km</span>
                                    </div>
                                    {/* Bottom Card */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-xl shadow-xl z-20">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-sm">Boxe Thai</h4>
                                            <span className="text-xs text-gray-500">18:30</span>
                                        </div>
                                        <button className="w-full bg-indigo-600 text-white text-xs py-2 rounded-lg font-bold">Réserver (1 crédit)</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Texte Explicatif */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Tout se passe dans votre poche.</h2>
                            <p className="text-lg text-gray-600 mb-8">Plus besoin de remplir des dossiers papier. Avec SportLib, l'accès aux clubs est instantané.</p>

                            <div className="space-y-6">
                                {[
                                    { icon: "fa-mobile-alt", title: "Le Quiz d'aiguillage", text: "Ne cherchez plus au hasard. Dites-nous ce que vous aimez, on trouve le sport fait pour vous." },
                                    { icon: "fa-map-marked-alt", title: "Géolocalisation Immédiate", text: "Trouvez un club ouvert maintenant, à moins de 15 minutes à pied ou vélo." },
                                    { icon: "fa-user-friends", title: "Invitez un ami", text: "Utilisez un de vos crédits pour inviter un proche. Le sport, c'est mieux à deux." }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                                <i className={`fas ${feature.icon} text-xl`}></i>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                                            <p className="mt-2 text-base text-gray-500">{feature.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="py-20 bg-gray-900 text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Une offre simple.</h2>
                    <p className="text-gray-400 mb-12">Arrêtez de payer pour des mois où vous n'y allez pas.</p>

                    <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl relative border-4 border-indigo-500 transform hover:scale-105 transition duration-300">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl font-bold text-sm">OFFRE DE LANCEMENT</div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-2">Passeport Découverte</h3>
                        <div className="flex justify-center items-baseline my-6">
                            <span className="text-6xl font-extrabold text-gray-900">25€</span>
                            <span class="text-gray-500 ml-2">/mois</span>
                        </div>
                        <ul className="text-left space-y-4 mb-8 text-lg mx-auto max-w-xs">
                            <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> 3 Crédits découverte</li>
                            <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Accès tous clubs partenaires</li>
                            <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> Quiz d'orientation inclus</li>
                            <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i> <strong>Sans engagement</strong></li>
                        </ul>
                        <button
                            onClick={toggleModal}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-indigo-700 transition shadow-lg"
                        >
                            Je commence maintenant
                        </button>
                        <p className="mt-4 text-xs text-gray-500">Satisfait ou remboursé sur la première séance.</p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-50 pt-12 pb-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold text-gray-800"><i className="fas fa-running mr-2"></i>SportLib</span>
                        <p className="text-sm text-gray-500 mt-2">© 2025 SportLib Project</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
                    🌱 Tech for Good
                </span>
                        <p className="text-xs text-gray-400">Agir pour demain : Bien-être & Inclusion.</p>
                    </div>
                </div>
            </footer>

            {/* MODAL (QUIZ) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
                        <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">Trouvons votre sport 🎯</h3>
                            <button onClick={toggleModal} className="text-white hover:text-gray-200 text-2xl">&times;</button>
                        </div>

                        <div className="p-6">
                            {formStep === 1 ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Quel est votre objectif ?</label>
                                        <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500">
                                            <option>Me défouler (Boxe, Crossfit...)</option>
                                            <option>Me relaxer (Yoga, Pilates...)</option>
                                            <option>Rencontrer du monde (Sports co...)</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Votre ville</label>
                                        <input type="text" placeholder="Ex: Nantes, Lyon..." className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500" required />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Email (pour recevoir l'invitation)</label>
                                        <input type="email" placeholder="thomas@email.com" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500" required />
                                    </div>
                                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition">
                                        Voir les clubs disponibles
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800">C'est noté !</h4>
                                    <p className="text-gray-600 mt-2">Vous êtes sur la liste d'attente. On vous appelle dans 24h.</p>
                                    <button onClick={toggleModal} className="mt-6 text-indigo-600 font-bold hover:underline">Fermer</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App