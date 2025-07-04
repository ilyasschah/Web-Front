import React, { useState } from 'react';
import { ProductGrid } from './ProductGrid';
import { Cart } from './Cart';
import { CategoryFilter } from './CategoryFilter';
import { SearchBar } from './SearchBar';
import { PaymentModal } from './PaymentModal';
import { CustomerSelector } from './CustomerSelector';
import { TableSelector } from './TableSelector';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { CreditCard, Users, Utensils } from 'lucide-react';

export const POSTerminal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);
  const [showTableSelector, setShowTableSelector] = useState(false);
  
  const { items, customer, tableId, getTotal } = useCartStore();

  const canCheckout = items.length > 0;

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left Panel - Products */}
      <div className="flex-1 flex flex-col">
        {/* Search and Filters */}
        <div className="mb-4 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-auto">
          <ProductGrid
            categoryFilter={selectedCategory}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {/* Right Panel - Cart */}
      <div className="w-96 flex flex-col">
        {/* Customer and Table Info */}
        <div className="mb-4 space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomerSelector(true)}
              className="flex-1"
            >
              <Users className="h-4 w-4 mr-2" />
              {customer ? customer.name : 'Select Customer'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTableSelector(true)}
            >
              <Utensils className="h-4 w-4 mr-2" />
              {tableId ? `Table ${tableId}` : 'Table'}
            </Button>
          </div>
        </div>

        {/* Cart */}
        <div className="flex-1 flex flex-col">
          <Cart />
        </div>

        {/* Checkout Button */}
        <div className="mt-4">
          <Button
            className="w-full h-12 text-lg"
            disabled={!canCheckout}
            onClick={() => setShowPayment(true)}
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Checkout ${getTotal().toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Modals */}
      {showPayment && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
        />
      )}
      
      {showCustomerSelector && (
        <CustomerSelector
          isOpen={showCustomerSelector}
          onClose={() => setShowCustomerSelector(false)}
        />
      )}
      
      {showTableSelector && (
        <TableSelector
          isOpen={showTableSelector}
          onClose={() => setShowTableSelector(false)}
        />
      )}
    </div>
  );
};