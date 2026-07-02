import { motion } from 'framer-motion';
import { MdCheck } from 'react-icons/md';

const plans = [
  {
    name: 'Landing Page',
    price: '₹4,999',
    description: 'Perfect for small businesses and personal portfolios.',
    features: ['1 Page Design', 'Mobile Responsive', 'Basic SEO', 'Contact Form', '3 Days Delivery'],
    isPopular: false,
  },
  {
    name: 'Business Website',
    price: '₹14,999',
    description: 'Ideal for growing companies needing multiple pages.',
    features: ['Up to 5 Pages', 'Dynamic Animations', 'Advanced SEO', 'Social Media Integration', '7 Days Delivery'],
    isPopular: true,
  },
  {
    name: 'E-Commerce / Web App',
    price: '₹29,999+',
    description: 'Custom solutions for complex requirements.',
    features: ['Unlimited Pages', 'Payment Gateway', 'Admin Dashboard', 'User Authentication', '24/7 Support'],
    isPopular: false,
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Transparent Pricing
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-panel"
              style={{
                padding: '40px 32px',
                position: 'relative',
                transform: plan.isPopular ? 'scale(1.05)' : 'scale(1)',
                border: plan.isPopular ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                zIndex: plan.isPopular ? 10 : 1
              }}
            >
              {plan.isPopular && (
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--accent-color)', color: '#fff', padding: '4px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Most Popular
                </div>
              )}
              
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>{plan.name}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', minHeight: '48px' }}>{plan.description}</p>
              
              <div style={{ fontSize: '40px', fontWeight: '700', marginBottom: '32px' }}>
                {plan.price}<span style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/project</span>
              </div>
              
              <ul style={{ listStyle: 'none', marginBottom: '40px' }}>
                {plan.features.map(feature => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <MdCheck style={{ color: 'var(--accent-color)' }} /> {feature}
                  </li>
                ))}
              </ul>
              
              <a href="#contact" className={`btn ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                Choose Plan
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
