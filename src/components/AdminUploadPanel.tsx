import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Sparkles, X, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { upscaleImage } from '@/utils/imageUpscaler';
import { addProduct } from '@/utils/localStorage';
import { useToast } from '@/hooks/use-toast';

interface AdminUploadPanelProps {
  onProductAdded: () => void;
}

export const AdminUploadPanel = ({ onProductAdded }: AdminUploadPanelProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Product['category']>('Shoes');
  const [description, setDescription] = useState('');
  const [originalImage, setOriginalImage] = useState<string>('');
  const [upscaledImage, setUpscaledImage] = useState<string>('');
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsUpscaling(true);

    try {
      // Show original
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);

      // Upscale
      const upscaled = await upscaleImage(selectedFile);
      setUpscaledImage(upscaled);
      
      toast({
        title: "Image upscaled!",
        description: "Your image has been enhanced with AI.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not process the image.",
        variant: "destructive",
      });
    } finally {
      setIsUpscaling(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !price || !upscaledImage) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields and upload an image.",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      category,
      description,
      image: upscaledImage,
      originalImage,
      isNew: true,
    };

    addProduct(product);
    onProductAdded();

    // Reset form
    setName('');
    setPrice('');
    setDescription('');
    setOriginalImage('');
    setUpscaledImage('');
    setFile(null);

    toast({
      title: "Product added!",
      description: `${name} has been added to the catalogue.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-8 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Upload New Product</h2>
          <p className="text-muted-foreground">Add products to your catalogue</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Nike Air Max"
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price (KSH)</Label>
              <Input
                id="price"
                type="number"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2999"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Product['category'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                  <SelectItem value="Clothes">Clothes</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description..."
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Product Image</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {!originalImage ? (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {isUpscaling && (
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <Sparkles className="w-5 h-5 animate-spin" />
                        <span>Upscaling with AI...</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Original</p>
                        <img src={originalImage} alt="Original" className="rounded-lg w-full" />
                      </div>
                      {upscaledImage && (
                        <div>
                          <p className="text-xs text-primary mb-2 flex items-center gap-1 justify-center">
                            <Check className="w-3 h-3" />
                            Enhanced
                          </p>
                          <img src={upscaledImage} alt="Upscaled" className="rounded-lg w-full ring-2 ring-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" size="lg" className="flex-1" disabled={isUpscaling}>
            <Sparkles className="mr-2 h-5 w-5" />
            Add Product to Catalogue
          </Button>
          {file && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setFile(null);
                setOriginalImage('');
                setUpscaledImage('');
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};
