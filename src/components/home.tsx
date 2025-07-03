import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, ShoppingCart, Users } from "lucide-react";
import DataTable from "./tables/DataTable";
import FormModal from "./modals/FormModal";

// Mock Data
const mockCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "555-1234", joinDate: "2023-01-15" },
];
const mockOrders = [
  { id: 1, product: "Coffee Mug", customer: "John Doe", quantity: 2, date: "2023-06-01", status: "Completed" },
];

// Table columns
const productColumns = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  {
    header: "Price",
    accessorKey: "price",
    cell: (info) => `${info.getValue()} DH`,
  },
  { header: "Stock", accessorKey: "stock" },
  { header: "Category", accessorKey: "category" },
];

const customerColumns = [
  { id: "id", header: "ID", accessorKey: "id" },
  { id: "name", header: "Name", accessorKey: "name" },
  { id: "email", header: "Email", accessorKey: "email" },
  { id: "phone", header: "Phone", accessorKey: "phone" },
  { id: "joinDate", header: "Join Date", accessorKey: "joinDate" },
];

const orderColumns = [
  { header: "ID", accessorKey: "id" },
  { header: "Product", accessorKey: "product" },
  { header: "Customer", accessorKey: "customer" },
  { header: "Quantity", accessorKey: "quantity" },
  { header: "Date", accessorKey: "date" },
  { header: "Status", accessorKey: "status" },
];

const customerFields = [
  { name: "name", label: "Customer Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "text", required: true },
  { name: "joinDate", label: "Join Date", type: "date", required: true },
];

const orderFields = [
  { name: "product", label: "Product", type: "text", required: true },
  { name: "customer", label: "Customer", type: "text", required: true },
  { name: "quantity", label: "Quantity", type: "number", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { value: "Processing", label: "Processing" },
      { value: "Shipped", label: "Shipped" },
      { value: "Completed", label: "Completed" },
    ],
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [formError, setFormError] = useState(""); // <-- add error state

  useEffect(() => {
    fetch("http://localhost:5000/Category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/Inventory")
      .then(res => res.json())
      .then(data => setInventories(data))
      .catch(err => {
        console.error("Failed to fetch inventory", err);
        setInventories([]);
      });
  }, []);
  useEffect(() => {
    if (activeTab === "products") {
      Promise.all([
        fetch("http://localhost:5000/Product").then((res) => res.json()),
        fetch("http://localhost:5000/Inventory").then((res) => res.json()),
      ])
        .then(([productData, inventoryData]) => {
          const enriched = productData.map((p) => ({
            ...p,
            stock: inventoryData.find((i) => i.productId === p.id)?.stock ?? 0,
            category: categories.find((c) => c.id === p.categoryId)?.name || "N/A",
          }));
          setProducts(enriched);
        })
        .catch((err) => {
          setProducts([]);
          console.error("Failed to fetch products or inventory:", err);
        });
    }
  }, [activeTab, categories]);

  const productFields = [
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "price", label: "Price", type: "number", required: true },
    { name: "stock", label: "Stock", type: "number", required: true },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      required: true,
      options: categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
    },
  ];

  const handleOpenModal = (type) => {
    setFormError(""); // reset error on open
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (modalType === "product") {
      setFormError(""); // reset before submit
      fetch("http://localhost:5000/Product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          categoryId: parseInt(data.categoryId),
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 409) {
            // Duplicate product
            const err = await res.json();
            throw new Error(err.error || "Duplicate product");
          } else {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error || "Failed to create product");
          }
        })
        .then((newProduct) => {
          const category = categories.find((c) => c.id === newProduct.categoryId);
          setProducts((prev) => [
            ...prev,
            {
              ...newProduct,
              stock: newProduct.stock ?? 0,
              category: category?.name || "N/A",
            },
          ]);
          setIsModalOpen(false);
        })
        .catch((err) => setFormError(err.message));
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-4">
        <div className="flex items-center justify-center mb-8">
          <ShoppingCart className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-xl font-bold">POS Dashboard</h1>
        </div>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab("products")} className={`flex items-center w-full p-3 rounded-md transition-colors ${activeTab === "products" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
            <BarChart3 className="h-5 w-5 mr-3" />
            Products
          </button>
          <button onClick={() => setActiveTab("customers")} className={`flex items-center w-full p-3 rounded-md transition-colors ${activeTab === "customers" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
            <Users className="h-5 w-5 mr-3" />
            Customers
          </button>
          <button onClick={() => setActiveTab("orders")} className={`flex items-center w-full p-3 rounded-md transition-colors ${activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
            <ShoppingCart className="h-5 w-5 mr-3" />
            Orders
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Products Management</CardTitle>
                <CardDescription>Manage your product inventory, prices, and stock levels.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={productColumns} data={products} onAddNew={() => handleOpenModal("product")} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="customers">
            <Card>
              <CardHeader><CardTitle>Customer Management</CardTitle></CardHeader>
              <CardContent>
                <DataTable columns={customerColumns} data={mockCustomers} onAddNew={() => handleOpenModal("customer")} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders">
            <Card>
              <CardHeader><CardTitle>Order Management</CardTitle></CardHeader>
              <CardContent>
                <DataTable columns={orderColumns} data={mockOrders} onAddNew={() => handleOpenModal("order")} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          title={`Add New ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
          fields={
            modalType === "product"
              ? productFields
              : modalType === "customer"
                ? customerFields
                : orderFields
          }
          error={formError} // pass error to modal
        />
      )}
    </div>
  );
};

export default Dashboard;
