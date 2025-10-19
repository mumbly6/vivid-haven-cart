import { motion } from 'framer-motion';

export const AnimatedDivider = () => {
  return (
    <div className="relative h-32 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-70" />
      
      <svg
        className="absolute bottom-0 w-full h-16"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z"
          className="fill-background"
          initial={{ d: "M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z" }}
          animate={{ d: "M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
};
