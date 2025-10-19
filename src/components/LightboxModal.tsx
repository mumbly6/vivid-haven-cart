import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface LightboxModalProps {
  image: string | null;
  onClose: () => void;
}

export const LightboxModal = ({ image, onClose }: LightboxModalProps) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-foreground hover:bg-primary/20 border border-primary/50 shadow-lg shadow-primary/50"
        >
          <X className="w-6 h-6" />
        </Button>

        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateX: 30 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotateX: -30 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20 
          }}
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
          <motion.img
            src={image}
            alt="Product"
            className="relative max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl shadow-primary/50 ring-2 ring-primary/30"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
