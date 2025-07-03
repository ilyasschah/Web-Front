import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard,
  DollarSign,
  Smartphone,
  Gift,
  Trash2,
  Receipt,
} from 'lucide-react';
import { Payment } from '@/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    payments,
    addPayment,
    removePayment,
    getTotal,
    getTotalPaid,
    getBalance,
    clearCart,
  } = useCartStore();

  const [cashAmount, setCashAmount] = useState('');
  const [cardAmount, setCardAmount] = useState('');
  const [digitalAmount, setDigitalAmount] = useState('');

  const total = getTotal();
  const totalPaid = getTotalPaid();
  const balance = getBalance();
  const change = totalPaid > total ? totalPaid - total : 0;

  const addCashPayment = () => {
    const amount = parseFloat(cashAmount);
    if (amount > 0) {
      const payment: Payment = {
        id: `cash-${Date.now()}`,
        method: 'cash',
        amount,
        change: amount > balance ? amount - balance : 0,
      };
      addPayment(payment);
      setCashAmount('');
    }
  };

  const addCardPayment = () => {
    const amount = parseFloat(cardAmount);
    if (amount > 0) {
      const payment: Payment = {
        id: `card-${Date.now()}`,
        method: 'card',
        amount,
        reference: `CARD-${Date.now()}`,
      };
      addPayment(payment);
      setCardAmount('');
    }
  };

  const addDigitalPayment = () => {
    const amount = parseFloat(digitalAmount);
    if (amount > 0) {
      const payment: Payment = {
        id: `digital-${Date.now()}`,
        method: 'digital',
        amount,
        reference: `DIGITAL-${Date.now()}`,
      };
      addPayment(payment);
      setDigitalAmount('');
    }
  };

  const completeOrder = () => {
    if (balance <= 0) {
      // Process order
      console.log('Order completed');
      clearCart();
      onClose();
    }
  };

  const quickCashAmounts = [10, 20, 50, 100];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Payment Methods */}
          <div className="space-y-4">
            <Tabs defaultValue="cash" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="cash">
                  <DollarSign className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="card">
                  <CreditCard className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="digital">
                  <Smartphone className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="loyalty">
                  <Gift className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cash" className="space-y-3">
                <Label>Cash Amount</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    step="0.01"
                  />
                  <Button onClick={addCashPayment}>Add</Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickCashAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setCashAmount(amount.toString())}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setCashAmount(balance.toFixed(2))}
                >
                  Exact Amount (${balance.toFixed(2)})
                </Button>
              </TabsContent>

              <TabsContent value="card" className="space-y-3">
                <Label>Card Amount</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={cardAmount}
                    onChange={(e) => setCardAmount(e.target.value)}
                    step="0.01"
                  />
                  <Button onClick={addCardPayment}>Add</Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setCardAmount(balance.toFixed(2))}
                >
                  Full Amount (${balance.toFixed(2)})
                </Button>
              </TabsContent>

              <TabsContent value="digital" className="space-y-3">
                <Label>Digital Payment Amount</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={digitalAmount}
                    onChange={(e) => setDigitalAmount(e.target.value)}
                    step="0.01"
                  />
                  <Button onClick={addDigitalPayment}>Add</Button>
                </div>
              </TabsContent>

              <TabsContent value="loyalty" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Loyalty points payment coming soon...
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Payment Summary */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paid:</span>
                    <span>${totalPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Balance:</span>
                    <span className={balance > 0 ? 'text-destructive' : 'text-green-600'}>
                      ${balance.toFixed(2)}
                    </span>
                  </div>
                  {change > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Change:</span>
                      <span>${change.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment List */}
            {payments.length > 0 && (
              <div className="space-y-2">
                <Label>Payments</Label>
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {payment.method}
                      </Badge>
                      <span>${payment.amount.toFixed(2)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePayment(payment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <Button
                className="w-full"
                disabled={balance > 0}
                onClick={completeOrder}
              >
                <Receipt className="h-4 w-4 mr-2" />
                Complete Order
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};