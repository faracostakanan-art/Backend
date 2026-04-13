import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NumericKeypad from '../components/NumericKeypad';

const PasswordStep = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  useEffect(() => {
    const identifier = sessionStorage.getItem('securipass_identifier');
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
      sessionStorage.setItem('securipass_password', password);
      navigate('/personal-info-step');
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4" data-testid="password-step">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <p className="text-gray-600 text-sm mb-4">Saisissez votre code secret</p>
        </div>

        <NumericKeypad
          value={password}
          maxLength={6}
          onNumberClick={handleNumberClick}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          submitLabel="Valider"
          showAsDashes={true}
          inputLabel=""
        />

        <div className="mt-8 text-center">
          <a href="#" className="text-[#1a2b6d] hover:underline text-sm font-medium" data-testid="forgot-password-link">
            Code secret oubli&eacute; ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordStep;
