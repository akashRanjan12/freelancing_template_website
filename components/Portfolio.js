import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdLock, MdOpenInNew } from 'react-icons/md';

const projects = [
  { 
    id: 1, 
    title: 'Coffee Shop', 
    category: 'Landing Page', 
    demoLink: 'https://democoffees.netlify.app/', 
    image: '/assets/coffeewebsiteImage.png' 
  },
  { 
    id: 2, 
    title: 'Iron Gym', 
    category: 'Business', 
    demoLink: 'https://demoirongym.netlify.app/', 
    image: '/assets/gymewebsiteImage.png' 
  },
  { 
    id: 3, 
    title: 'Portfolio Templates', 
    category: 'Web App', 
    demoLink: 'https://akash-ranjan.netlify.app/', 
    demoLink2: 'https://rchandra.netlify.app/', 
    image: '/assets/portfoliowebsiteImage.png', 
    image2: '/assets/secondportfolioImage.png' 
  },
  { 
    id: 4, 
    title: 'Organic E-Commerce', 
    category: 'E-commerce', 
    demoLink: 'https://organic-prod.netlify.app/', 
    image: '/assets/-commercewebInmage.png' 
  },
  { 
    id: 5, 
    title: 'Music App UI', 
    category: 'Web App', 
    demoLink: null, 
    image: '/assets/musicebsiteImage.png' 
  },
];

const categories = ['All', 'E-commerce', 'Business', 'Web App', 'Landing Page'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

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
                <div style={{ height: '200px', display: 'flex', backgroundColor: '#e0e0e0', position: 'relative' }}>
                  {project.image2 ? (
                    <>
                      <img src={project.image} alt={project.title} style={{ width: '50%', height: '100%', objectFit: 'cover', borderRight: '1px solid var(--border-color)' }} />
                      <img src={project.image2} alt={project.title} style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                    </>
                  ) : (
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', color: 'var(--accent-color)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {project.category}
                  </span>
                  <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>{project.title}</h3>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {project.demoLink ? (
                      <>
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%' }}>
                          {project.demoLink2 ? 'Template 1 (Akash)' : 'Live Demo'} <MdOpenInNew />
                        </a>
                        {project.demoLink2 && (
                          <a href={project.demoLink2} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%' }}>
                            Template 2 (RChandra) <MdOpenInNew />
                          </a>
                        )}
                      </>
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
    </section>
  );
}
