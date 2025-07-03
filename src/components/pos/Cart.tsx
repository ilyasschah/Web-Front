import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus, Percent, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Cart: React.FC = () => {
  const {
    items,
    discount,
    discountType,
    removeItem,
    updateQuantity,
    updateItemPrice,
    updateItemDiscount,
    setDiscount,
    getSubtotal,
    getTotalDiscount,
    getTax,
    getTotal,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <div className="text-4xl mb-2">🛒</div>
            <p>Cart is empty</p>
            <p className="text-sm">Add products to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Cart Items */}
        <div className="flex-1 space-y-3 overflow-auto">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.product.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItemPrice(item.id, Number(e.target.value))}
                      className="h-6 w-20 text-xs"
                      step="0.01"
                    />
                    <span className="text-xs text-muted-foreground">each</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="h-6 w-6 p-0 text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {/* Item Discount */}
              {item.discount > 0 && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    -{item.discountType === 'percentage' ? `${item.discount}%` : `$${item.discount}`}
                  </Badge>
                  {item.discountReason && (
                    <span>{item.discountReason}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Global Discount */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Discount:</span>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value), discountType)}
                className="h-8 w-20 text-sm"
                placeholder="0"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDiscount(discount, discountType === 'fixed' ? 'percentage' : 'fixed')}
                className="h-8 w-8 p-0"
              >
                {discountType === 'fixed' ? <DollarSign className="h-3 w-3" /> : <Percent className="h-3 w-3" />}
              </Button>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${getSubtotal().toFixed(2)}</span>
            </div>
            {getTotalDiscount() > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-${getTotalDiscount().toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${getTax().toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};