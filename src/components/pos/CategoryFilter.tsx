import React from 'react';
import { useCategories } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }

  const activeCategories = categories?.filter(cat => cat.isActive) || [];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <Button
        variant={selectedCategory === '' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('')}
        className="whitespace-nowrap"
      >
        All Categories
      </Button>
      
      {activeCategories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "whitespace-nowrap",
            category.color && selectedCategory === category.id && {
              backgroundColor: category.color,
              borderColor: category.color,
            }
          )}
        >
          {category.icon && <span className="mr-1">{category.icon}</span>}
          {category.name}
        </Button>
      ))}
    </div>
  );
};