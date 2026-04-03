import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        <a className="navbar-logo" href="#hero" onClick={() => handleNav('#hero')}>
          <span className="logo-z">Z</span>
          <span className="logo-name">Zeenat<span className="logo-dot">.</span></span>
        </a>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <button key={link.label} className="nav-link" onClick={() => handleNav(link.href)}>
              {link.label}
            </button>
          ))}
          <button className="btn btn-primary nav-cta" onClick={() => handleNav('#contact')}>
            Hire Me
          </button>
        </nav>

        <button
          className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
