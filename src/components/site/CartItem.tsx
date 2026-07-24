import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem as CartItemType } from "@/contexts/CartContext";

type Props = {
  item: CartItemType;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
};

export function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  const subtotal = item.product.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-border/60 bg-card/90 p-4 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary/80 p-2">
            <img src={item.product.image} alt={item.product.name} className="h-full w-full object-contain object-center" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{item.product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.product.packing}</p>
            <div className="mt-2 text-sm font-semibold text-primary">₹{item.product.price}</div>
          </div>
        </div>

        <div className="ml-auto flex flex-col items-start gap-3 sm:items-end">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background/80 p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => onDecrease(item.product.id)} aria-label={`Decrease quantity for ${item.product.name}`}>
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => onIncrease(item.product.id)} aria-label={`Increase quantity for ${item.product.name}`}>
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="text-lg font-bold text-foreground">₹{subtotal}</p>
          </div>

          <Button variant="outline" size="sm" onClick={() => onRemove(item.product.id)} className="text-destructive hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
