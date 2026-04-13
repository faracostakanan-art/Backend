import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import NumericKeypad from '../components/NumericKeypad';

const IdentifierStep = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleNumberClick = (num) => {
    if (identifier.length < 10) {
      setIdentifier(identifier + num);
    }
  };

  const handleDelete = () => {
    setIdentifier(identifier.slice(0, -1));
  };

  const handleSubmit = () => {
    if (identifier.length === 10) {
      sessionStorage.setItem('certicode_identifier', identifier);
      navigate('/password-step');
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4" data-testid="identifier-step">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connexion à votre espace client</h2>
          <p className="text-gray-600 text-sm">Identifiant (10 chiffres)</p>
        </div>

        <NumericKeypad
          value={identifier}
          maxLength={10}
          onNumberClick={handleNumberClick}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          submitLabel="Continuer"
          showAsDashes={false}
        />

        {/* Mémoriser mon identifiant */}
        <div className="flex items-center gap-3 mt-6">
          <span className="text-gray-600 text-sm">Mémoriser mon identifiant</span>
          <button className="text-[#003DA5]" data-testid="info-remember-btn">
            <Info size={18} />
          </button>
          <button
            onClick={() => setRememberMe(!rememberMe)}
            data-testid="remember-me-toggle"
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              rememberMe ? 'bg-[#003DA5]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                rememberMe ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        <div className="mt-8 text-center">
          <a href="#" className="text-[#003DA5] hover:underline text-sm font-medium" data-testid="forgot-id-link">
            Identifiant oublié ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default IdentifierStep;
