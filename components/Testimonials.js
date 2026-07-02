import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Rahul Sharma', company: 'TechNova India', feedback: 'Akash built an incredibly responsive and beautiful website for us. The animations are top-notch and the performance is flawless.' },
  { name: 'Priya Desai', company: 'Desai Boutiques', feedback: 'I wanted a modern, sleek e-commerce store and Akash delivered beyond my expectations. Highly recommended!' },
  { name: 'Amit Patel', company: 'Patel Realty', feedback: 'The 3D motion elements added a premium feel to our real estate portfolio. Communication was smooth and delivery was on time.' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          What Clients Say
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {testimonials.map((test, index) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-panel"
              style={{ padding: '32px' }}
            >
              <div style={{ fontSize: '40px', color: 'var(--accent-color)', marginBottom: '16px', opacity: 0.5 }}>"</div>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>{test.feedback}</p>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '600' }}>{test.name}</h4>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{test.company}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
