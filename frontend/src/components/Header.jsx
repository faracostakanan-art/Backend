import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, HelpCircle } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Mise à jour', path: '/login' },
    { name: 'Aide', path: '/faq' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" data-testid="header">
      {/* Top bar */}
      <div className="bg-[#003DA5] py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">Particuliers</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="text-white hover:text-blue-200 transition-colors flex items-center gap-1">
              <HelpCircle size={16} />
              <span className="hidden sm:inline">Aide et contacts</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo LBP */}
          <Link to="/" className="flex items-center group" data-testid="logo-link">
            <img 
              src="/logo-lbp.svg" 
              alt="La Banque Postale" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                className={`text-sm font-medium transition-all duration-200 hover:text-[#003DA5] relative group ${
                  isActive(link.path) ? 'text-[#003DA5]' : 'text-gray-700'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#003DA5] transition-all duration-200 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              asChild
              className="bg-[#003DA5] hover:bg-[#002d7a] text-white font-semibold px-6 transition-all duration-200 shadow-lg hover:shadow-xl rounded-full"
              data-testid="espace-client-btn"
            >
              <Link to="/login">Espace client</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 border-t border-gray-200">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-md transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-[#003DA5] text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <Button
                asChild
                className="w-full bg-[#003DA5] hover:bg-[#002d7a] text-white font-semibold rounded-full"
              >
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Espace client
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
