import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Lock, UserCircle, Calendar, AlertCircle } from 'lucide-react';
import { authenticateUser } from '../mock';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    clientNumber: '',
    lastName: '',
    dateOfBirth: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authenticateUser(
        formData.clientNumber,
        formData.lastName,
        formData.dateOfBirth
      );
      
      if (result.success) {
        login(result.user);
        navigate('/update-password');
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Info Banner */}
        <Alert className="mb-8 border-[#002855] bg-[#002855]/5">
          <Lock className="h-5 w-5 text-[#002855]" />
          <AlertDescription className="text-[#002855] ml-2">
            <strong>Connexion sécurisée.</strong> Vos données sont protégées par cryptage SSL 256-bit.
          </AlertDescription>
        </Alert>

        <Card className="shadow-2xl border-none">
          <CardHeader className="space-y-4 pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#002855] to-[#003875] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Lock className="text-white" size={32} />
            </div>
            <CardTitle className="text-3xl font-bold text-center text-[#002855]">
              Authentification
            </CardTitle>
            <CardDescription className="text-center text-base">
              Connectez-vous pour mettre à jour votre Secur'Pass
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="animate-in slide-in-from-top duration-300">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="clientNumber" className="text-[#002855] font-semibold flex items-center gap-2">
                  <UserCircle size={18} />
                  Numéro de client
                </Label>
                <Input
                  id="clientNumber"
                  name="clientNumber"
                  type="text"
                  placeholder="12345678"
                  value={formData.clientNumber}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028]"
                />
                <p className="text-xs text-gray-500 mt-1">Votre numéro de client à 8 chiffres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#002855] font-semibold flex items-center gap-2">
                  <UserCircle size={18} />
                  Nom de famille
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-[#002855] font-semibold flex items-center gap-2">
                  <Calendar size={18} />
                  Date de naissance
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028]"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#e60028] hover:bg-[#c00020] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  <a href="#" className="text-[#e60028] hover:underline font-medium">
                    Code secret oublié ?
                  </a>
                </p>
                <p className="text-xs text-gray-500">
                  Besoin d'aide ? Contactez le{' '}
                  <span className="font-semibold text-[#002855]">09 69 39 00 00</span>
                </p>
              </div>
            </div>

            {/* Demo credentials info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-semibold text-blue-900 mb-2">ℹ️ Identifiants de démonstration :</p>
              <div className="text-xs text-blue-800 space-y-1">
                <p>Numéro client : <strong>12345678</strong></p>
                <p>Nom : <strong>Dupont</strong></p>
                <p>Date de naissance : <strong>1985-03-15</strong></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
