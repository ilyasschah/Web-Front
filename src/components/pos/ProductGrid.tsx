import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/store/cartStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  categoryFilter: string;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  categoryFilter,
  searchQuery,
}) => {
  const { data: productsData, isLoading } = useProducts({
    category: categoryFilter || undefined,
    search: searchQuery || undefined,
  });
  
  const { addItem } = useCartStore();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-32 bg-muted rounded mb-3"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const products = productsData?.data || [];

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <Package className="h-16 w-16 mb-4" />
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            product.stock <= 0 && "opacity-50"
          )}
          onClick={() => product.stock > 0 && addItem(product)}
        >
          <CardContent className="p-4">
            <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Package className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            
            <h3 className="font-medium text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <Badge variant={product.stock > 10 ? "default" : "destructive"}>
                {product.stock} left
              </Badge>
            </div>

            <Button
              size="sm"
              className="w-full"
              disabled={product.stock <= 0}
              onClick={(e) => {
                e.stopPropagation();
                addItem(product);
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};