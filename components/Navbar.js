import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDarkMode, MdLightMode, MdMenu, MdClose } from 'react-icons/md';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 24px',
        backgroundColor: isScrolled ? 'var(--bg-surface)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? 'var(--shadow-1)' : 'none',
        transition: 'background-color 0.3s, box-shadow 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Sky<span style={{ color: 'var(--accent-color)' }}>.</span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'none', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{ fontWeight: '500', transition: 'color 0.2s' }}>
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={toggleTheme} 
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '20px' }}
          >
            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </button>
          
          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </div>

        {/* Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="mobile-nav-toggle">
          <button 
            onClick={toggleTheme} 
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '20px' }}
          >
            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '24px' }}
          >
            {mobileMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-surface)',
              boxShadow: 'var(--shadow-2)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '18px', fontWeight: '500', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => setMobileMenuOpen(false)}>
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
