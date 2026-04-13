import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle2, Home, Phone } from 'lucide-react';

const FinalConfirmation = () => {
  useEffect(() => {
    // Clean up any remaining session data
    sessionStorage.removeItem('securipass_identifier');
    sessionStorage.removeItem('securipass_password');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-none overflow-hidden">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-[#e60028] to-[#c00020] p-8 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="text-[#e60028]" size={48} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Demande enregistrée !</h1>
            <p className="text-red-50 text-lg">Votre demande de mise à jour a bien été prise en compte</p>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* Success Message */}
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Merci d'avoir complété votre demande de mise à jour Secur'Pass.
              </p>
              <div className="bg-red-50 border-2 border-[#e60028] rounded-lg p-6 my-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-[#e60028] mt-1 flex-shrink-0" size={32} />
                  <div className="text-left">
                    <h3 className="font-bold text-[#e60028] text-xl mb-2">Prochaine étape</h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      Un conseiller vous contactera dans les <strong>24 à 48 heures</strong> pour finaliser la mise à jour de votre Secur'Pass et vérifier vos informations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg mb-3">ℹ️ À retenir :</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#e60028] mt-1">•</span>
                  <span>Gardez votre téléphone à proximité pour l'appel de confirmation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e60028] mt-1">•</span>
                  <span>Aucun frais ne vous sera demandé pour cette mise à jour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e60028] mt-1">•</span>
                  <span>Votre compte reste accessible pendant le traitement</span>
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
                className="flex-1 h-12 bg-[#e60028] hover:bg-[#c00020] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/">
                  <Home className="mr-2" size={20} />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 h-12 border-2 border-[#e60028] text-[#e60028] hover:bg-[#e60028] hover:text-white font-semibold transition-all duration-300"
              >
                <Link to="/faq">Consulter l'aide</Link>
              </Button>
            </div>

            {/* Support Info */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Questions ? Contactez-nous au{' '}
                <span className="font-semibold text-[#e60028]">09 69 39 00 00</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">Disponible 24h/24, 7j/7</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinalConfirmation;
