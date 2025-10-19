import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { MessageCircle, Phone } from 'lucide-react';
import { Product } from '@/types/product';

interface WhatsAppCheckoutProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const AGENT_1 = '254703534744';
const AGENT_2 = '254702948737';

export const WhatsAppCheckout = ({ product, isOpen, onClose }: WhatsAppCheckoutProps) => {
  if (!product) return null;

  const createWhatsAppLink = (agentNumber: string) => {
    const message = `Hi, I want to order ${product.name} priced $${product.price.toFixed(2)} at Haven Style.`;
    return `https://wa.me/${agentNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Choose a sales agent to complete your order via WhatsApp
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="text-lg font-bold text-primary mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Select Sales Agent:</p>
            
            <a
              href={createWhatsAppLink(AGENT_1)}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-4 hover:bg-accent hover:text-accent-foreground"
              >
                <div className="p-2 bg-green-500/10 rounded-full">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold">Agent 1</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    +{AGENT_1}
                  </p>
                </div>
              </Button>
            </a>

            <a
              href={createWhatsAppLink(AGENT_2)}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-4 hover:bg-accent hover:text-accent-foreground"
              >
                <div className="p-2 bg-green-500/10 rounded-full">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold">Agent 2</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    +{AGENT_2}
                  </p>
                </div>
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
