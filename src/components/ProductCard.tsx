import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewImage: (image: string) => void;
  onOrderNow: (product: Product) => void;
}

export const ProductCard = ({ product, onViewImage, onOrderNow }: ProductCardProps) => {
  return (
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative bg-gradient-to-b from-card to-card/80 rounded-2xl overflow-hidden border border-border hover:border-primary transition-all duration-500 shadow-lg hover:shadow-[0_0_40px_rgba(var(--primary),0.4)]"
    >
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-muted to-muted/50">
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onViewImage(product.image)}
          whileHover={{ scale: 1.15, filter: "brightness(1.1)" }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {product.isNew && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            NEW
          </Badge>
        )}
        
        {product.isSale && (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
            SALE
          </Badge>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="bg-card/90 backdrop-blur-md px-6 py-3 rounded-xl shadow-2xl border border-primary"
          >
            <Eye className="w-6 h-6 text-primary mb-2 mx-auto" />
            <p className="text-sm font-semibold text-foreground">View Details</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
          </div>
        </div>

        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div>
            {product.isSale && product.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  KSH {product.salePrice.toFixed(0)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  KSH {product.price.toFixed(0)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary">
                KSH {product.price.toFixed(0)}
              </span>
            )}
          </div>
          
          <Button
            onClick={() => onOrderNow(product)}
            size="sm"
            variant="accent"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Order
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
