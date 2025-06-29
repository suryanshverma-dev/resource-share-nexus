import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, BookOpen, User, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginDialog from './LoginDialog';
import SignupDialog from './SignupDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">ResourceHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`font-medium transition-colors ${
                isActive('/browse') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Browse
            </Link>
            <Link
              to="/contribute"
              className={`font-medium transition-colors ${
                isActive('/contribute') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Contribute
            </Link>
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <LoginDialog>
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-600 transition-colors">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                </LoginDialog>
                <SignupDialog>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </button>
                </SignupDialog>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="py-4 space-y-2">
              <Link
                to="/"
                className={`block px-4 py-2 font-medium transition-colors ${
                  isActive('/') ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className={`block px-4 py-2 font-medium transition-colors ${
                  isActive('/browse') ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                to="/contribute"
                className={`block px-4 py-2 font-medium transition-colors ${
                  isActive('/contribute') ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contribute
              </Link>
              
              {/* Mobile Auth Section */}
              <div className="border-t pt-4 mt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-gray-700">
                      Welcome, {user?.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <LoginDialog>
                      <button 
                        className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </button>
                    </LoginDialog>
                    <SignupDialog>
                      <button 
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors mx-4"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>Sign Up</span>
                      </button>
                    </SignupDialog>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
