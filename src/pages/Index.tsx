import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { PromoCarousel } from '@/components/PromoCarousel';
import { AdminUploadPanel } from '@/components/AdminUploadPanel';
import { FilterBar } from '@/components/FilterBar';
import { ProductCard } from '@/components/ProductCard';
import { LightboxModal } from '@/components/LightboxModal';
import { WhatsAppCheckout } from '@/components/WhatsAppCheckout';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ShieldCheck } from 'lucide-react';
import { Product } from '@/types/product';
import { loadProducts } from '@/utils/localStorage';

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const catalogueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  const refreshProducts = () => {
    setProducts(loadProducts());
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToCatalogue = () => {
    catalogueRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Mode Toggle */}
      <div className="fixed top-4 right-4 z-40 bg-card border border-border rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <Label htmlFor="admin-mode" className="text-sm">Admin Mode</Label>
          <Switch
            id="admin-mode"
            checked={isAdminMode}
            onCheckedChange={setIsAdminMode}
          />
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection onShopNow={scrollToCatalogue} />

      {/* Promo Carousel */}
      <PromoCarousel />

      {/* Admin Upload Panel */}
      {isAdminMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-12"
        >
          <AdminUploadPanel onProductAdded={refreshProducts} />
        </motion.div>
      )}

      {/* Catalogue Section */}
      <div ref={catalogueRef} className="container mx-auto px-4 py-12 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Collection</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover premium products enhanced with AI technology
          </p>
        </motion.div>

        <div className="space-y-8">
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">
                {products.length === 0 
                  ? "No products yet. Enable Admin Mode to add products!"
                  : "No products match your search."}
              </p>
              {isAdminMode && products.length === 0 && (
                <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Add Your First Product
                </Button>
              )}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewImage={setLightboxImage}
                  onOrderNow={setCheckoutProduct}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal */}
      <LightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      {/* WhatsApp Checkout */}
      <WhatsAppCheckout
        product={checkoutProduct}
        isOpen={!!checkoutProduct}
        onClose={() => setCheckoutProduct(null)}
      />
    </div>
  );
};

export default Index;
