import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

export default function Hero() {
  return (
    <section className="section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 3D Background Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8ab4f8" />
          
          <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1.5, 64, 64]} position={[2, 0, 0]}>
              <MeshDistortMaterial 
                color="#1a73e8" 
                attach="material" 
                distort={0.4} 
                speed={2} 
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
          </Float>

          <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
            <Sphere args={[1, 64, 64]} position={[-2.5, 1, -2]}>
              <MeshDistortMaterial 
                color="#8ab4f8" 
                attach="material" 
                distort={0.3} 
                speed={1.5} 
                roughness={0.1}
                metalness={0.5}
                wireframe
              />
            </Sphere>
          </Float>
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel"
          style={{ padding: '64px 40px', maxWidth: '800px', backgroundColor: 'rgba(var(--bg-surface-rgb), 0.7)' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}
          >
            <img 
              src="/logo.png" 
              alt="Hack The Sky Logo" 
              style={{ height: '72px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 16px rgba(255, 60, 60, 0.45))' }} 
            />
          </motion.div>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: '700', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-2px' }}>
            Transforming Ideas <br /> Into <span style={{ color: 'var(--accent-color)' }}>Digital Reality</span>.
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            I specialize in creating ultra-responsive, beautiful, and animated websites tailored for businesses and startups.
          </p>
          
          <div className="hero-btns">
            <a href="#portfolio" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>View My Work</a>
            <a href="#contact" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '16px', backgroundColor: 'var(--bg-primary)' }}>Contact Me</a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
