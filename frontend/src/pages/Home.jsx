import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Smartphone, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';

const Home = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Cryptage renforcé',
      description: 'Vos données sont protégées par un cryptage de niveau bancaire.'
    },
    {
      icon: Smartphone,
      title: 'Authentification mobile',
      description: 'Validez vos opérations sensibles directement depuis votre smartphone.'
    },
    {
      icon: Lock,
      title: 'Détection des menaces',
      description: 'Surveillance continue pour identifier toute activité suspecte.'
    }
  ];

  const advantages = [
    {
      icon: CheckCircle,
      title: 'Sécurité renforcée',
      description: 'Protection maximale contre les cybermenaces grâce aux technologies de pointe.'
    },
    {
      icon: Smartphone,
      title: "Simplicité d'utilisation",
      description: 'Interface intuitive pour une mise à jour rapide et sans complications.'
    },
    {
      icon: Shield,
      title: 'Accompagnement personnalisé',
      description: 'Nos conseillers sont disponibles pour vous aider à chaque étape.'
    }
  ];

  return (
    <div className="animate-fade-in" data-testid="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#003DA5] via-[#0052CC] to-[#003DA5] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
              <AlertTriangle size={16} className="text-yellow-300" />
              <span className="text-sm font-semibold tracking-wide">MISE À JOUR OBLIGATOIRE</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Renforcez la sécurité de votre compte
            </h1>
            <p className="text-lg text-white/85 mb-8 max-w-lg">
              Mettez à jour votre Certicode Plus dès maintenant pour bénéficier d'une protection maximale contre les cybermenaces.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-white text-[#003DA5] hover:bg-blue-50 font-semibold px-8 py-6 text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link to="/login" data-testid="hero-update-btn">
                  Mettre à jour maintenant
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-base rounded-full transition-all duration-300">
                <Link to="/faq" data-testid="hero-faq-btn">En savoir plus</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1758519291442-6a34815b0ae3?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=600"
              alt="Sécurité bancaire"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Pourquoi mettre à jour votre Certicode Plus ?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Certicode Plus est votre dispositif d'authentification forte pour sécuriser vos opérations bancaires en ligne.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#003DA5]/10 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon className="text-[#003DA5]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Les avantages de Certicode Plus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-[#003DA5] rounded-full flex items-center justify-center mx-auto mb-5">
                  <adv.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{adv.title}</h3>
                <p className="text-gray-600">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
