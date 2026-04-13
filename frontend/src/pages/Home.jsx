import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ShieldCheck, Smartphone, Eye, Bell, LockKeyhole, MousePointerClick, Headset, ArrowRight, AlertTriangle } from 'lucide-react';
import { securityFeatures, advantagesData } from '../mock';

const Home = () => {
  const iconMap = {
    'shield-check': ShieldCheck,
    'smartphone': Smartphone,
    'eye': Eye,
    'bell': Bell,
    'lock-keyhole': LockKeyhole,
    'mouse-pointer-click': MousePointerClick,
    'headset': Headset
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[#e60028] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Mise à jour obligatoire
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
                Renforcez la sécurité de votre compte
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Mettez à jour votre Secur'Pass dès maintenant pour bénéficier d'une protection maximale contre les cybermenaces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#e60028] hover:bg-[#c00020] text-white font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Link to="/login">
                    Mettre à jour maintenant
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold px-8 py-6 text-lg transition-all duration-300"
                >
                  <Link to="/faq">En savoir plus</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=600&h=800&fit=crop" 
                  alt="Smartphone sécurisé" 
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 border-2 border-[#e60028] shadow-2xl max-w-xs">
                <div className="flex items-start gap-4">
                  <div className="bg-[#e60028] p-3 rounded-lg">
                    <AlertTriangle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900">Action requise</h3>
                    <p className="text-gray-600 text-sm">Date limite : 31 décembre 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Update Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi mettre à jour votre Secur'Pass ?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              La sécurité numérique évolue constamment. Notre nouvelle version intègre les technologies les plus avancées pour protéger vos données.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <Card key={feature.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-14 h-14 bg-[#e60028]/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="text-[#e60028]" size={28} />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Les avantages de Secur'Pass
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une solution complète pour une sécurité sans compromis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {advantagesData.map((advantage) => {
              const Icon = iconMap[advantage.icon];
              return (
                <div key={advantage.id} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#e60028] to-[#c00020] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="text-white" size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            Prêt à sécuriser votre compte ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            La mise à jour ne prend que quelques minutes. Protégez vos données dès aujourd'hui.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#e60028] hover:bg-[#c00020] text-white font-semibold px-12 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Link to="/login">
              Commencer la mise à jour
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
