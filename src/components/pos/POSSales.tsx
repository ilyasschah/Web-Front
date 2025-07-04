import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Trash2,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock products data - replace with API calls
const mockProducts = [
  {
    id: 1,
    name: "Coffee",
    price: 4.5,
    stock: 50,
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&q=80",
  },
  {
    id: 2,
    name: "Sandwich",
    price: 12.99,
    stock: 25,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=200&q=80",
  },
  {
    id: 3,
    name: "Pastry",
    price: 7.5,
    stock: 30,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&q=80",
  },
  {
    id: 4,
    name: "Tea",
    price: 3.5,
    stock: 40,
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&q=80",
  },
  {
    id: 5,
    name: "Cake",
    price: 20.0,
    stock: 15,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&q=80",
  },
];

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface POSSalesProps {
  className?: string;
}

const POSSales = ({ className = "" }: POSSalesProps) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerName, setCustomerName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(10); // 10% tax

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update cart item quantity
  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  // Process sale
  const processSale = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const saleData = {
      items: cart,
      customerName: customerName || "Walk-in Customer",
      paymentMethod,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
      timestamp: new Date().toISOString(),
    };

    console.log("Processing sale:", saleData);
    alert(`Sale completed! Total: $${total.toFixed(2)}`);

    // Clear cart after successful sale
    setCart([]);
    setCustomerName("");
    setDiscount(0);
  };

  return (
    <div className={cn("w-full bg-background min-h-screen", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Products Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Products
              </CardTitle>
              <CardDescription>
                Select products to add to the cart
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square mb-3 overflow-hidden rounded-md">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm">
                          {product.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </span>
                          <Badge
                            variant={
                              product.stock > 10 ? "default" : "destructive"
                            }
                            className="text-xs"
                          >
                            Stock: {product.stock}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Cart
              </CardTitle>
              <CardDescription>
                {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Info */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer Name</label>
                <Input
                  placeholder="Enter customer name (optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              {/* Cart Items */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
                    <p>Cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 ml-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Discount and Tax */}
              {cart.length > 0 && (
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium flex-1">
                      Discount (%)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium flex-1">
                      Tax (%)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={tax}
                      onChange={(e) => setTax(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                </div>
              )}

              {/* Totals */}
              {cart.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({discount}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Tax ({tax}%):</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              {cart.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <label className="text-sm font-medium">Payment Method</label>
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Cash
                        </div>
                      </SelectItem>
                      <SelectItem value="card">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Card
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Process Sale Button */}
              <Button
                onClick={processSale}
                className="w-full"
                size="lg"
                disabled={cart.length === 0}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Process Sale
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default POSSales;
