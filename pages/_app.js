import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { useSecurity } from '../utils/security';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');
  
  useSecurity();

  useEffect(() => {
    // Check local storage or system preference on load
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <Component {...pageProps} theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

export default MyApp;
