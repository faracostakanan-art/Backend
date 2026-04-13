import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Progress } from '../components/ui/progress';
import { Lock, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updatePassword } from '../mock';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const password = formData.newPassword;
    const checks = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const score = Object.values(checks).filter(Boolean).length;
    setPasswordStrength({ score, checks });
  }, [formData.newPassword]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (passwordStrength.score < 5) {
      setError('Votre mot de passe ne respecte pas tous les critères de sécurité.');
      return;
    }

    setLoading(true);

    try {
      const result = await updatePassword(
        user.id,
        formData.oldPassword,
        formData.newPassword
      );

      if (result.success) {
        navigate('/confirmation');
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 3) return 'bg-yellow-500';
    if (passwordStrength.score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 2) return 'Faible';
    if (passwordStrength.score <= 3) return 'Moyen';
    if (passwordStrength.score <= 4) return 'Bon';
    return 'Excellent';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Alert className="mb-8 border-[#002855] bg-[#002855]/5">
          <Lock className="h-5 w-5 text-[#002855]" />
          <AlertDescription className="text-[#002855] ml-2">
            <strong>Session sécurisée.</strong> Connecté en tant que client n° {user?.clientNumber}
          </AlertDescription>
        </Alert>

        <Card className="shadow-2xl border-none">
          <CardHeader className="space-y-4 pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#002855] to-[#003875] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Lock className="text-white" size={32} />
            </div>
            <CardTitle className="text-3xl font-bold text-center text-[#002855]">
              Mise à jour de votre Secur'Pass
            </CardTitle>
            <CardDescription className="text-center text-base">
              Créez un nouveau mot de passe sécurisé pour protéger votre compte
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

              {/* Old Password */}
              <div className="space-y-2">
                <Label htmlFor="oldPassword" className="text-[#002855] font-semibold">
                  Ancien Secur'Pass
                </Label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder="Entrez votre ancien mot de passe"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                    className="h-12 pr-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#002855]"
                  >
                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Pour la démo, utilisez : <strong>Password123!</strong></p>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-[#002855] font-semibold">
                  Nouveau Secur'Pass
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Créez un mot de passe sécurisé"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="h-12 pr-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#002855]"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="space-y-3 mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#002855]">Force du mot de passe :</span>
                      <span className={`text-sm font-semibold ${
                        passwordStrength.score <= 2 ? 'text-red-500' :
                        passwordStrength.score <= 3 ? 'text-yellow-500' :
                        passwordStrength.score <= 4 ? 'text-blue-500' : 'text-green-500'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <Progress 
                      value={(passwordStrength.score / 5) * 100} 
                      className="h-2"
                    />
                    <div className="space-y-2 text-sm">
                      {[
                        { key: 'length', label: 'Au moins 12 caractères' },
                        { key: 'uppercase', label: 'Une lettre majuscule' },
                        { key: 'lowercase', label: 'Une lettre minuscule' },
                        { key: 'number', label: 'Un chiffre' },
                        { key: 'special', label: 'Un caractère spécial (!@#$...)' }
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center gap-2">
                          {passwordStrength.checks[key] ? (
                            <CheckCircle2 className="text-green-500" size={16} />
                          ) : (
                            <XCircle className="text-gray-400" size={16} />
                          )}
                          <span className={passwordStrength.checks[key] ? 'text-green-700' : 'text-gray-600'}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#002855] font-semibold">
                  Confirmer le nouveau Secur'Pass
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmez votre nouveau mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="h-12 pr-12 border-gray-300 focus:border-[#e60028] focus:ring-[#e60028]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#002855]"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || passwordStrength.score < 5}
                className="w-full h-12 bg-[#e60028] hover:bg-[#c00020] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Mise à jour en cours...' : 'Valider la mise à jour'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePassword;
