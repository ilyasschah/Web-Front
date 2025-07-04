import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Table } from '@/types';
import { cn } from '@/lib/utils';

interface TableSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock tables data
const mockTables: Table[] = [
  { id: '1', number: '1', seats: 4, status: 'vacant', x: 0, y: 0, width: 100, height: 100 },
  { id: '2', number: '2', seats: 2, status: 'occupied', x: 0, y: 0, width: 100, height: 100 },
  { id: '3', number: '3', seats: 6, status: 'vacant', x: 0, y: 0, width: 100, height: 100 },
  { id: '4', number: '4', seats: 4, status: 'reserved', x: 0, y: 0, width: 100, height: 100 },
  { id: '5', number: '5', seats: 8, status: 'vacant', x: 0, y: 0, width: 100, height: 100 },
  { id: '6', number: '6', seats: 2, status: 'cleaning', x: 0, y: 0, width: 100, height: 100 },
];

export const TableSelector: React.FC<TableSelectorProps> = ({
  isOpen,
  onClose,
}) => {
  const { setTable, tableId } = useCartStore();

  const handleSelectTable = (table: Table) => {
    if (table.status === 'vacant') {
      setTable(table.id);
      onClose();
    }
  };

  const handleTakeaway = () => {
    setTable(null);
    onClose();
  };

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'vacant':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cleaning':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Table</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Takeaway Option */}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleTakeaway}
          >
            <Utensils className="h-4 w-4 mr-2" />
            Takeaway / Delivery
          </Button>

          {/* Tables Grid */}
          <div className="grid grid-cols-3 gap-3">
            {mockTables.map((table) => (
              <Card
                key={table.id}
                className={cn(
                  "cursor-pointer transition-all",
                  table.status === 'vacant' && "hover:bg-accent",
                  table.status !== 'vacant' && "opacity-50 cursor-not-allowed",
                  tableId === table.id && "ring-2 ring-primary"
                )}
                onClick={() => handleSelectTable(table)}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold mb-1">
                    Table {table.number}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {table.seats} seats
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("text-xs capitalize", getStatusColor(table.status))}
                  >
                    {table.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-200"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-200"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-200"></div>
              <span>Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-200"></div>
              <span>Cleaning</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};