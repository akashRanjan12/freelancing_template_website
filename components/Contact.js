import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdMessage, MdSend } from 'react-icons/md';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxe9p741JdjJ_zAZP_MOlSbgkHnH00oP7h6TgJ4Kq5lwO52xPTBTtRpHlqKDSytLZCH/exec';
const PHONE_NUMBER = '919508009054';
const EMAIL = 'akash12ranjan@gmail.com';

// Actual Google Cloud Client ID
const GOOGLE_CLIENT_ID = '130344833703-m2n1vbmvgijicf6h2b0sna2nk83cohes.apps.googleusercontent.com';

export default function Contact() {
  const [userEmail, setUserEmail] = useState('');
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('user_gmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      if (decoded.email) {
        localStorage.setItem('user_gmail', decoded.email);
        setUserEmail(decoded.email);
        setShowEmailPrompt(false);
      }
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      alert("Google Login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    alert("Google Login failed. Please check your console.");
  };

  const sendMessage = async (method) => {
    if (!userEmail) {
      setShowEmailPrompt(true);
      return;
    }
    
    if (!message) {
      alert("Please enter a message first.");
      return;
    }

    if (method === 'whatsapp') {
      const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(`Hi Akash, I'm reaching out from your client website.\nMy Email: ${userEmail}\nMessage: ${message}`)}`;
      window.open(waUrl, '_blank');
      return;
    }

    if (method === 'mailto') {
      const mailUrl = `mailto:${EMAIL}?subject=Client Website Contact&body=${encodeURIComponent(`Message: ${message}\nFrom: ${userEmail}`)}`;
      window.open(mailUrl, '_blank');
      return;
    }

    setStatus('loading');
    try {
      const formData = new URLSearchParams();
      formData.append('email', userEmail);
      formData.append('message', message);
      formData.append('method', method);

      // Google Apps Script Call
      const appsScriptPromise = fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      // Web3Forms Call (Direct to Email)
      const web3FormsPromise = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'd09bbdca-783b-4ce7-9f5f-fa2a3b76248e',
          email: userEmail,
          message: message,
          from_name: 'Client Website',
          subject: 'New Direct Message from Client Website',
          botcheck: false
        })
      });

      // Execute both requests concurrently
      await Promise.all([appsScriptPromise, web3FormsPromise]);
      
      setStatus('success');
      setMessage('');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <section id="contact" className="section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '64px 32px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
          >
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Let's Work Together</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '18px' }}>
              Have a project in mind? Let's discuss how we can bring it to life.
            </p>

            {!userEmail ? (
              <div style={{ marginBottom: '32px' }}>
                <p style={{ marginBottom: '16px', fontWeight: '500' }}>Please sign in to send a message directly.</p>
                <button onClick={() => setShowEmailPrompt(true)} className="btn btn-primary" style={{ padding: '12px 24px' }}>
                  Sign in with Google
                </button>
              </div>
            ) : (
              <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <span>Signed in as: <strong>{userEmail}</strong></span>
                <button 
                  onClick={() => { localStorage.removeItem('user_gmail'); setUserEmail(''); }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Change
                </button>
              </div>
            )}

            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              style={{ 
                width: '100%', 
                minHeight: '150px', 
                padding: '16px', 
                borderRadius: '12px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                marginBottom: '24px',
                resize: 'vertical'
              }}
            />

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => sendMessage('app_script')}
                className="btn btn-primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : (status === 'success' ? 'Sent!' : <><MdSend /> Send Direct</>)}
              </button>
              <button 
                onClick={() => sendMessage('whatsapp')}
                className="btn btn-secondary"
              >
                <MdMessage /> Send via WhatsApp
              </button>
              <button 
                onClick={() => sendMessage('mailto')}
                className="btn btn-secondary"
              >
                <MdEmail /> Send via Email
              </button>
            </div>
            
            {status === 'error' && <p style={{ color: '#FF6B6B', marginTop: '16px' }}>Failed to send message. Please try WhatsApp/Email directly.</p>}

          </motion.div>
        </div>

        {/* Google Login Prompt Modal */}
        {showEmailPrompt && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}>
            <div className="glass-panel" style={{ padding: '32px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Sign in with Google</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
                We use Google Sign-In to verify your email and prevent spam.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="filled_blue"
                  shape="rectangular"
                />
              </div>

              <button type="button" onClick={() => setShowEmailPrompt(false)} className="btn btn-secondary" style={{ width: '100%' }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </GoogleOAuthProvider>
  );
}
