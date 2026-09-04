import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdLock, MdOpenInNew } from 'react-icons/md';

const projects = [
  { 
    id: 1, 
    title: 'Salon Website', 
    category: 'Beauty & Salon', 
    demoLink: 'https://precious-salon.netlify.app/', 
    image: '/assets/salon-website.webp' 
  },
  { 
    id: 2, 
    title: 'Spa Salon', 
    category: 'Beauty & Salon', 
    demoLink: 'https://womenspasalon.netlify.app/', 
    image: '/assets/spa-salon.webp' 
  },
  { 
    id: 3, 
    title: "Men's Salon", 
    category: "Beauty & Salon", 
    demoLink: 'https://haircutmensalon.netlify.app/', 
    image: '/assets/mens-salon.webp' 
  },
  { 
    id: 4, 
    title: 'Fitness Gym', 
    category: 'Gym', 
    demoLink: 'https://fitnesssgym.netlify.app/', 
    image: '/assets/fitness-gym.webp' 
  },
  { 
    id: 5, 
    title: 'Iron Gym', 
    category: 'Gym', 
    demoLink: 'https://demoirongym.netlify.app/', 
    image: '/assets/gymewebsiteImage.webp' 
  },
  { 
    id: 6, 
    title: 'Coffee Shop', 
    category: 'Cafe', 
    demoLink: 'https://democoffees.netlify.app/', 
    image: '/assets/coffeewebsiteImage.webp' 
  },
  { 
    id: 7, 
    title: 'Organic E-Commerce', 
    category: 'E-Commerce', 
    demoLink: 'https://organic-prod.netlify.app/', 
    image: '/assets/-commercewebInmage.webp' 
  },
  { 
    id: 8, 
    title: 'Portfolio Templates', 
    category: 'Portfolio', 
    demoLink: 'https://akash-ranjan.netlify.app/', 
    image: '/assets/portfoliowebsiteImage.webp' 
  },
  { 
    id: 9, 
    title: 'Music App UI', 
    category: 'Web App', 
    demoLink: null, 
    image: '/assets/musicebsiteImage.webp' 
  },
];

const categories = ['All', 'Beauty & Salon', 'Gym', 'Cafe', 'E-Commerce', 'Portfolio', 'Web App'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (imgSrc) => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      setLightboxImage(imgSrc);
    }
  };

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Selected Works
        </motion.h2>

        {/* Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-panel"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: '200px', display: 'flex', backgroundColor: '#e0e0e0', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="portfolio-img"
                    onClick={() => openLightbox(project.image)}
                    onError={(e) => {
                      if (e.target.src.endsWith('.webp')) {
                        e.target.src = e.target.src.replace('.webp', '.png');
                      }
                    }}
                  />
                </div>
                
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', color: 'var(--accent-color)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {project.category}
                  </span>
                  <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>{project.title}</h3>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {project.demoLink ? (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%' }}>
                          Live Demo <MdOpenInNew />
                        </a>
                    ) : (
                      <button className="btn" style={{ width: '100%', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'not-allowed' }} disabled>
                        Locked <MdLock />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightboxImage(null)}
          >
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
                &times;
              </button>
              <img src={lightboxImage} alt="Enlarged Portfolio" className="lightbox-img" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
