import { useEffect } from 'react';

export const useSecurity = () => {
  useEffect(() => {
    // Disable right click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, PrintScreen)
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'U') {
        e.preventDefault();
      }
      // Print Screen
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText(''); // Try to clear clipboard
        alert('Screenshots are disabled on this website.');
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};
