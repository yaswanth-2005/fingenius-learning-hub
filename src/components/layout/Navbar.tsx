
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  const location = useLocation();
  
  // Update scrolled state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock login/logout function
  const handleAuthAction = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Podcast', path: '/podcast' },
    { name: 'AI Chatbot', path: '/chatbot' },
    { name: 'Games', path: '/games' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'}`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Fingenius
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${isActive(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Button */}
        <div className="hidden md:block">
          <Button 
            onClick={handleAuthAction}
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isLoggedIn ? 'Logout' : 'Login / Sign Up'}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="container px-4 mx-auto py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg font-medium ${
                isActive(link.path) ? 'text-primary' : 'text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            onClick={handleAuthAction}
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white w-full mt-4"
          >
            {isLoggedIn ? 'Logout' : 'Login / Sign Up'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
