import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ParticlesBackground } from './ParticlesBackground';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
}

export const HeroSection = ({ onShopNow }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
      <ParticlesBackground />
      
      {/* Floating Product Silhouettes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 opacity-10"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full rounded-full bg-primary-foreground blur-xl" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-16 w-40 h-40 opacity-10"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full rounded-full bg-accent-foreground blur-2xl" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-24 h-24 opacity-10"
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full rounded-full bg-secondary-foreground blur-xl" />
      </motion.div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full border border-accent/30">
              <span className="text-primary-foreground font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Welcome to Haven Style
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground"
          >
            Discover Your
            <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              Haven Style
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-primary-foreground/90"
          >
            Premium fashion at your fingertips. Shop exclusive collections that define your style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={onShopNow}
              variant="accent"
              size="lg"
              className="text-lg group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-glow to-accent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="relative z-10 flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              View Collections
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
