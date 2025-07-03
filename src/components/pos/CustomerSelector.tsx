import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Customer } from '@/types';

interface CustomerSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock customers data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com',
    loyaltyPoints: 150,
    totalSpent: 1250.50,
    isActive: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+1234567891',
    email: 'jane@example.com',
    loyaltyPoints: 75,
    totalSpent: 850.25,
    isActive: true,
  },
];

export const CustomerSelector: React.FC<CustomerSelectorProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setCustomer } = useCartStore();

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone?.includes(searchQuery) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCustomer = (customer: Customer) => {
    setCustomer(customer);
    onClose();
  };

  const handleWalkIn = () => {
    setCustomer(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Customer</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Walk-in Customer */}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleWalkIn}
          >
            <User className="h-4 w-4 mr-2" />
            Walk-in Customer
          </Button>

          {/* Customer List */}
          <div className="max-h-64 overflow-auto space-y-2">
            {filteredCustomers.map((customer) => (
              <Card
                key={customer.id}
                className="cursor-pointer hover:bg-accent"
                onClick={() => handleSelectCustomer(customer)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{customer.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {customer.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {customer.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {customer.loyaltyPoints} pts
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        ${customer.totalSpent.toFixed(2)} spent
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Customer */}
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add New Customer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};