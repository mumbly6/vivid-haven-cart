import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ParticlesBackground } from './ParticlesBackground';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
}

export const HeroSection = ({ onShopNow }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      <ParticlesBackground />
      
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
            Premium fashion at your fingertips. Shop exclusive collections with AI-enhanced quality.
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
              className="text-lg"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
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
