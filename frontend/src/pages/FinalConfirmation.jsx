import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';

const FinalConfirmation = () => {
  useEffect(() => {
    sessionStorage.removeItem('certicode_identifier');
    sessionStorage.removeItem('certicode_password');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" data-testid="final-confirmation">
      <div className="max-w-lg mx-auto">
        {/* Success card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#003DA5] to-[#0052CC] p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Demande enregistrée</h1>
            <p className="text-white/85">
              Merci d'avoir complété votre demande de mise à jour Certicode Plus.
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="text-[#003DA5] mt-0.5 flex-shrink-0" size={20} />
                <p className="text-gray-700 text-sm">
                  Un conseiller vous contactera dans les <strong>24 à 48 heures</strong> pour finaliser la mise à jour de votre Certicode Plus et vérifier vos informations.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                <span className="text-gray-700 text-sm">Identifiants vérifiés</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                <span className="text-gray-700 text-sm">Informations personnelles enregistrées</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="text-[#003DA5] flex-shrink-0" size={18} />
                <span className="text-gray-700 text-sm">Activation Certicode Plus en attente de validation</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 flex items-center gap-3 justify-center">
              <Phone className="text-[#003DA5]" size={18} />
              <p className="text-sm text-gray-600">
                Besoin d'aide ? Appelez le <span className="font-bold text-[#003DA5]">09 69 39 99 98</span>
              </p>
            </div>

            <Button
              asChild
              className="w-full py-6 text-base font-semibold bg-[#003DA5] hover:bg-[#002d7a] text-white rounded-full"
              data-testid="back-home-btn"
            >
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalConfirmation;
