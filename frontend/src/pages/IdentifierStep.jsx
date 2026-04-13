import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import NumericKeypad from '../components/NumericKeypad';

const IdentifierStep = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleNumberClick = (num) => {
    if (identifier.length < 8) {
      setIdentifier(identifier + num);
    }
  };

  const handleDelete = () => {
    setIdentifier(identifier.slice(0, -1));
  };

  const handleSubmit = () => {
    if (identifier.length === 8) {
      sessionStorage.setItem('securipass_identifier', identifier);
      navigate('/password-step');
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4" data-testid="identifier-step">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <p className="text-gray-600 text-sm mb-2">Saisissez votre identifiant client</p>
        </div>

        <NumericKeypad
          value={identifier}
          maxLength={8}
          onNumberClick={handleNumberClick}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          submitLabel="Valider"
          showAsDashes={false}
          inputLabel=""
        />

        {/* Se souvenir de moi */}
        <div className="flex items-center gap-3 mt-6">
          <span className="text-gray-600 text-sm">Se souvenir de moi</span>
          <button className="text-[#1a2b6d]" data-testid="info-remember-btn">
            <Info size={18} />
          </button>
          <button
            onClick={() => setRememberMe(!rememberMe)}
            data-testid="remember-me-toggle"
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              rememberMe ? 'bg-[#1a2b6d]' : 'bg-gray-300'
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
          <p className="text-sm text-gray-500">
            Besoin d'aide ? Contactez le{' '}
            <span className="font-semibold text-[#e60028]">09 69 39 00 00</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdentifierStep;
