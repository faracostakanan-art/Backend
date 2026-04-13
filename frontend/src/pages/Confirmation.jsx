import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle2, Home, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Confirmation = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    // Auto logout after 30 seconds
    const timer = setTimeout(() => {
      logout();
    }, 30000);

    return () => clearTimeout(timer);
  }, [logout]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-none overflow-hidden">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="text-green-500" size={48} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Mise à jour réussie !</h1>
            <p className="text-green-50 text-lg">Votre Secur'Pass a été mis à jour avec succès</p>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* Success Message */}
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-700">
                Félicitations, votre compte est maintenant protégé par notre système de sécurité renforcé.
              </p>
              <p className="text-sm text-gray-600">
                Client n° <strong className="text-[#002855]">{user?.clientNumber}</strong>
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Cryptage activé</h3>
                    <p className="text-sm text-blue-700">Vos données sont protégées par cryptage SSL 256-bit</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Compte sécurisé</h3>
                    <p className="text-sm text-green-700">Votre compte bénéficie des dernières protections</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-[#002855] text-lg mb-3">ℹ️ À retenir :</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#e60028] mt-1">•</span>
                  <span>Votre nouveau Secur'Pass est actif immédiatement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e60028] mt-1">•</span>
                  <span>Utilisez-le dès votre prochaine connexion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e60028] mt-1">•</span>
                  <span>Ne partagez jamais votre Secur'Pass avec qui que ce soit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e60028] mt-1">•</span>
                  <span>Un email de confirmation vous a été envoyé</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="flex-1 h-12 bg-[#002855] hover:bg-[#001a3d] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/">
                  <Home className="mr-2" size={20} />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 h-12 border-2 border-[#002855] text-[#002855] hover:bg-[#002855] hover:text-white font-semibold transition-all duration-300"
              >
                <Link to="/faq">Consulter l'aide</Link>
              </Button>
            </div>

            {/* Support Info */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Besoin d'assistance ? Contactez-nous au{' '}
                <span className="font-semibold text-[#002855]">09 69 39 00 00</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Confirmation;
