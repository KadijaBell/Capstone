import { motion } from "framer-motion";
import Particles from './Particles';

const ParticleBackground = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative bg-midnight/95"
    >
      {/* Particles Background */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleCount={400}
          particleSpread={10}
          speed={0.3}
          particleColors={[
            '#CBA135', // gold
            '#E8B4B8', // blush
            '#2C3E50', // navy
            '#1a1a1a', // near black
            '#008080', // mint
            '#FFFFFF', // white
          ]}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          alphaParticles={true}
          particleBaseSize={700}
          sizeRandomness={0.3}
          cameraDistance={15}
          className="w-full h-full opacity-90"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-1 bg-gradient-to-br from-midnight/80 via-transparent to-gold/20 mix-blend-multiply" />

      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default ParticleBackground;
