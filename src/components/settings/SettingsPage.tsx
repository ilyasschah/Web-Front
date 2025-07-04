import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Store,
  User,
  CreditCard,
  Bell,
  Shield,
  Database,
  Printer,
  Wifi,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = ({ className = "" }: SettingsPageProps) => {
  // Store Settings
  const [storeName, setStoreName] = useState("My POS Store");
  const [storeAddress, setStoreAddress] = useState("123 Main St, City, State");
  const [storePhone, setStorePhone] = useState("+1 (555) 123-4567");
  const [storeEmail, setStoreEmail] = useState("store@example.com");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("America/New_York");

  // Tax Settings
  const [defaultTaxRate, setDefaultTaxRate] = useState(10);
  const [taxIncluded, setTaxIncluded] = useState(false);

  // Receipt Settings
  const [receiptHeader, setReceiptHeader] = useState(
    "Thank you for your purchase!",
  );
  const [receiptFooter, setReceiptFooter] = useState("Visit us again!");
  const [printReceipts, setPrintReceipts] = useState(true);

  // User Settings
  const [username, setUsername] = useState("admin");
  const [email, setEmail] = useState("admin@store.com");
  const [role, setRole] = useState("admin");

  // Notification Settings
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [dailyReports, setDailyReports] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // System Settings
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [printerName, setPrinterName] = useState("Default Printer");

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings...`);
    alert(`${section} settings saved successfully!`);
  };

  return (
    <div className={cn("w-full bg-background min-h-screen", className)}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure your POS system settings and preferences
          </p>
        </div>

        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="store" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Store
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              User
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Store Information
                  </CardTitle>
                  <CardDescription>
                    Configure your store details and regional settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Store Name</label>
                      <Input
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Enter store name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        value={storePhone}
                        onChange={(e) => setStorePhone(e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Currency</label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">
                            GBP - British Pound
                          </SelectItem>
                          <SelectItem value="CAD">
                            CAD - Canadian Dollar
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Store Address</label>
                    <Input
                      value={storeAddress}
                      onChange={(e) => setStoreAddress(e.target.value)}
                      placeholder="Enter store address"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Timezone</label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">
                          Eastern Time
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          Central Time
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          Mountain Time
                        </SelectItem>
                        <SelectItem value="America/Los_Angeles">
                          Pacific Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={() => handleSaveSettings("Store")}
                    className="w-full md:w-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Store Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Settings */}
          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Profile
                </CardTitle>
                <CardDescription>
                  Manage your user account and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <span>Administrator</span>
                            <Badge variant="default" className="text-xs">
                              Full Access
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="manager">
                          <div className="flex items-center gap-2">
                            <span>Manager</span>
                            <Badge variant="secondary" className="text-xs">
                              Limited Access
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="cashier">
                          <div className="flex items-center gap-2">
                            <span>Cashier</span>
                            <Badge variant="outline" className="text-xs">
                              Sales Only
                            </Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings("User")}
                  className="w-full md:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save User Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment & Tax Settings
                </CardTitle>
                <CardDescription>
                  Configure payment methods and tax calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Default Tax Rate (%)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={defaultTaxRate}
                      onChange={(e) =>
                        setDefaultTaxRate(Number(e.target.value))
                      }
                      placeholder="Enter tax rate"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Tax Calculation
                    </label>
                    <Select
                      value={taxIncluded ? "included" : "excluded"}
                      onValueChange={(value) =>
                        setTaxIncluded(value === "included")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excluded">
                          Tax Excluded from Prices
                        </SelectItem>
                        <SelectItem value="included">
                          Tax Included in Prices
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Receipt Header</label>
                  <Input
                    value={receiptHeader}
                    onChange={(e) => setReceiptHeader(e.target.value)}
                    placeholder="Enter receipt header text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Receipt Footer</label>
                  <Input
                    value={receiptFooter}
                    onChange={(e) => setReceiptFooter(e.target.value)}
                    placeholder="Enter receipt footer text"
                  />
                </div>
                <Button
                  onClick={() => handleSaveSettings("Payment")}
                  className="w-full md:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Payment Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure alerts and notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Low Stock Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when products are running low
                      </p>
                    </div>
                    <Button
                      variant={lowStockAlert ? "default" : "outline"}
                      onClick={() => setLowStockAlert(!lowStockAlert)}
                    >
                      {lowStockAlert ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  {lowStockAlert && (
                    <div className="space-y-2 ml-4">
                      <label className="text-sm font-medium">
                        Alert Threshold
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={lowStockThreshold}
                        onChange={(e) =>
                          setLowStockThreshold(Number(e.target.value))
                        }
                        placeholder="Minimum stock level"
                        className="w-32"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Daily Reports</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive daily sales reports
                      </p>
                    </div>
                    <Button
                      variant={dailyReports ? "default" : "outline"}
                      onClick={() => setDailyReports(!dailyReports)}
                    >
                      {dailyReports ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send notifications via email
                      </p>
                    </div>
                    <Button
                      variant={emailNotifications ? "default" : "outline"}
                      onClick={() => setEmailNotifications(!emailNotifications)}
                    >
                      {emailNotifications ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings("Notification")}
                  className="w-full md:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage security and access control settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Change Password
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Session Timeout (minutes)
                    </label>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings("Security")}
                  className="w-full md:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Settings
                </CardTitle>
                <CardDescription>
                  Configure system preferences and hardware settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Auto Backup
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically backup your data
                      </p>
                    </div>
                    <Button
                      variant={autoBackup ? "default" : "outline"}
                      onClick={() => setAutoBackup(!autoBackup)}
                    >
                      {autoBackup ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  {autoBackup && (
                    <div className="space-y-2 ml-4">
                      <label className="text-sm font-medium">
                        Backup Frequency
                      </label>
                      <Select
                        value={backupFrequency}
                        onValueChange={setBackupFrequency}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Printer className="h-4 w-4" />
                      Default Printer
                    </label>
                    <Input
                      value={printerName}
                      onChange={(e) => setPrinterName(e.target.value)}
                      placeholder="Enter printer name"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <Printer className="h-4 w-4" />
                        Auto Print Receipts
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically print receipts after each sale
                      </p>
                    </div>
                    <Button
                      variant={printReceipts ? "default" : "outline"}
                      onClick={() => setPrintReceipts(!printReceipts)}
                    >
                      {printReceipts ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => handleSaveSettings("System")}
                  className="w-full md:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save System Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
