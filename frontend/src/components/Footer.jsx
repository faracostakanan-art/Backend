import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Smartphone, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#003DA5] text-white" data-testid="footer">
      {/* CTA Section */}
      <div className="bg-[#002d7a] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/90 text-lg mb-4">
            Votre sécurité est notre priorité. Mettez à jour votre Certicode Plus pour une protection renforcée.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white text-[#003DA5] px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg"
            data-testid="footer-update-btn"
          >
            Mettre à jour mon Certicode Plus
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-3">
            <Shield className="text-white/70 mt-1 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-semibold mb-1">Sécurité garantie</h4>
              <p className="text-white/70 text-sm">Vos données sont protégées par un cryptage bancaire.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="text-white/70 mt-1 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-semibold mb-1">Certicode Plus</h4>
              <p className="text-white/70 text-sm">Authentification forte pour vos opérations sensibles.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Smartphone className="text-white/70 mt-1 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-semibold mb-1">Application mobile</h4>
              <p className="text-white/70 text-sm">Gérez vos comptes depuis votre smartphone.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-center text-white/60 text-sm">
          <p>La Banque Postale - Société Anonyme - 115 rue de Sèvres 75275 Paris CEDEX 06</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
