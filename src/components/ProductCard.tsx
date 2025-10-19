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
      whileHover={{ y: -8 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
    >
      <div className="relative overflow-hidden aspect-square">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onViewImage(product.image)}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
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

        <motion.button
          onClick={() => onViewImage(product.image)}
          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.05 }}
        >
          <Eye className="w-8 h-8 text-primary-foreground" />
        </motion.button>
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
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
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
