import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function Home({ theme, toggleTheme }) {
  return (
    <div>
      <Head>
        <title>Akash Ranjan | Web Development Portfolio</title>
        <meta name="description" content="Professional web development services for the Indian market." />
      </Head>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      
      <footer style={{ textAlign: 'center', padding: '32px 24px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '16px' }}>
          <a href="https://instagram.com/hack_the_sky" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color='var(--accent-color)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/akash-kumar-ranjan/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color='var(--accent-color)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>
            LinkedIn
          </a>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>&copy; {new Date().getFullYear()} Akash Ranjan. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
