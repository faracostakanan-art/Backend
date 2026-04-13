import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Search, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Mise à jour', path: '/login' },
    { name: 'Aide', path: '/faq' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-[#e60028] py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="text-white">Particuliers</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="text-white hover:text-red-100 transition-colors flex items-center gap-1">
              <HelpCircle size={16} />
              <span className="hidden sm:inline">Aide et contacts</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo SG */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/sg-logo.jpeg" 
              alt="SG - C'est vous l'avenir" 
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 hover:text-[#e60028] relative group ${
                  isActive(link.path) ? 'text-[#e60028]' : 'text-gray-700'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#e60028] transition-all duration-200 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-[#e60028]">
              <Search size={20} />
            </Button>
            {isAuthenticated ? (
              <Button
                onClick={logout}
                className="bg-[#e60028] hover:bg-[#c00020] text-white font-semibold px-6 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Déconnexion
              </Button>
            ) : (
              <Button
                asChild
                className="bg-[#e60028] hover:bg-[#c00020] text-white font-semibold px-6 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Link to="/login">Espace client</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 border-t border-gray-200 animate-in slide-in-from-top duration-200">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-md transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-[#e60028] text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200">
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#e60028] hover:bg-[#c00020] text-white font-semibold"
                >
                  Déconnexion
                </Button>
              ) : (
                <Button
                  asChild
                  className="w-full bg-[#e60028] hover:bg-[#c00020] text-white font-semibold"
                >
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Espace client
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
