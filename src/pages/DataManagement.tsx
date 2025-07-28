import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Search, Users, Car, ClipboardList } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  carModel: string;
  licensePlate: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

interface ServiceRecord {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  status: string;
  amount: number;
}

const DataManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Sample data
  const [customers, setCustomers] = useState<Customer[]>([
    { id: "1", name: "สมชาย ใจดี", phone: "080-123-4567", email: "somchai@email.com", carModel: "Toyota Camry", licensePlate: "กก-1234" },
    { id: "2", name: "สมหญิง สวยงาม", phone: "081-234-5678", email: "somying@email.com", carModel: "Honda Civic", licensePlate: "ขข-5678" },
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: "1", name: "ล้างรถธรรมดา", price: 150, duration: "30 นาที", description: "ล้างรถภายนอกพื้นฐาน" },
    { id: "2", name: "ล้างรถพรีเมียม", price: 300, duration: "60 นาที", description: "ล้างรถภายนอกและภายใน" },
    { id: "3", name: "เคลือบเงา", price: 800, duration: "120 นาที", description: "เคลือบเงาและปกป้องสีรถ" },
  ]);

  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([
    { id: "1", customerId: "1", customerName: "สมชาย ใจดี", serviceId: "1", serviceName: "ล้างรถธรรมดา", date: "2024-01-15", status: "เสร็จสิ้น", amount: 150 },
    { id: "2", customerId: "2", customerName: "สมหญิง สวยงาม", serviceId: "2", serviceName: "ล้างรถพรีเมียม", date: "2024-01-16", status: "กำลังดำเนินการ", amount: 300 },
  ]);

  const customerForm = useForm<Customer>();
  const serviceForm = useForm<Service>();

  const handleAddCustomer = (data: Customer) => {
    if (editingId) {
      setCustomers(customers.map(c => c.id === editingId ? { ...data, id: editingId } : c));
      toast({ title: "แก้ไขข้อมูลลูกค้าสำเร็จ" });
    } else {
      const newCustomer = { ...data, id: Date.now().toString() };
      setCustomers([...customers, newCustomer]);
      toast({ title: "เพิ่มลูกค้าใหม่สำเร็จ" });
    }
    setIsDialogOpen(false);
    setEditingId(null);
    customerForm.reset();
  };

  const handleAddService = (data: Service) => {
    if (editingId) {
      setServices(services.map(s => s.id === editingId ? { ...data, id: editingId } : s));
      toast({ title: "แก้ไขข้อมูลบริการสำเร็จ" });
    } else {
      const newService = { ...data, id: Date.now().toString() };
      setServices([...services, newService]);
      toast({ title: "เพิ่มบริการใหม่สำเร็จ" });
    }
    setIsDialogOpen(false);
    setEditingId(null);
    serviceForm.reset();
  };

  const handleEdit = (type: string, item: any) => {
    setEditingId(item.id);
    if (type === 'customer') {
      customerForm.reset(item);
    } else {
      serviceForm.reset(item);
    }
    setIsDialogOpen(true);
  };

  const handleDelete = (type: string, id: string) => {
    if (type === 'customer') {
      setCustomers(customers.filter(c => c.id !== id));
      toast({ title: "ลบข้อมูลลูกค้าสำเร็จ" });
    } else {
      setServices(services.filter(s => s.id !== id));
      toast({ title: "ลบข้อมูลบริการสำเร็จ" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">จัดการข้อมูล</h1>
            <p className="text-muted-foreground">จัดการข้อมูลลูกค้า บริการ และประวัติการให้บริการ</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="ค้นหาข้อมูล..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>

        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              ข้อมูลลูกค้า
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              ข้อมูลบริการ
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              ประวัติการให้บริการ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>รายชื่อลูกค้า</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => {
                        setEditingId(null);
                        customerForm.reset();
                      }}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      เพิ่มลูกค้าใหม่
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingId ? "แก้ไขข้อมูลลูกค้า" : "เพิ่มลูกค้าใหม่"}</DialogTitle>
                    </DialogHeader>
                    <Form {...customerForm}>
                      <form onSubmit={customerForm.handleSubmit(handleAddCustomer)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={customerForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ชื่อ-นามสกุล</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="กรอกชื่อ-นามสกุล" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customerForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>เบอร์โทรศัพท์</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="080-123-4567" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>อีเมล</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" placeholder="email@example.com" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customerForm.control}
                            name="carModel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>รุ่นรถยนต์</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Toyota Camry" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customerForm.control}
                            name="licensePlate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ทะเบียนรถ</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="กก-1234" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            ยกเลิก
                          </Button>
                          <Button type="submit">
                            {editingId ? "บันทึกการแก้ไข" : "เพิ่มลูกค้า"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อ-นามสกุล</TableHead>
                      <TableHead>เบอร์โทรศัพท์</TableHead>
                      <TableHead>อีเมล</TableHead>
                      <TableHead>รุ่นรถยนต์</TableHead>
                      <TableHead>ทะเบียนรถ</TableHead>
                      <TableHead className="text-right">การดำเนินการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers
                      .filter(customer => 
                        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        customer.phone.includes(searchTerm) ||
                        customer.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.carModel}</TableCell>
                          <TableCell>{customer.licensePlate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit('customer', customer)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete('customer', customer.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>รายการบริการ</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => {
                        setEditingId(null);
                        serviceForm.reset();
                      }}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      เพิ่มบริการใหม่
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingId ? "แก้ไขข้อมูลบริการ" : "เพิ่มบริการใหม่"}</DialogTitle>
                    </DialogHeader>
                    <Form {...serviceForm}>
                      <form onSubmit={serviceForm.handleSubmit(handleAddService)} className="space-y-4">
                        <FormField
                          control={serviceForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ชื่อบริการ</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="กรอกชื่อบริการ" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={serviceForm.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ราคา (บาท)</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" placeholder="150" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={serviceForm.control}
                            name="duration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ระยะเวลา</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="30 นาที" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={serviceForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>รายละเอียดบริการ</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="กรอกรายละเอียดบริการ" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            ยกเลิก
                          </Button>
                          <Button type="submit">
                            {editingId ? "บันทึกการแก้ไข" : "เพิ่มบริการ"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อบริการ</TableHead>
                      <TableHead>ราคา</TableHead>
                      <TableHead>ระยะเวลา</TableHead>
                      <TableHead>รายละเอียด</TableHead>
                      <TableHead className="text-right">การดำเนินการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services
                      .filter(service => 
                        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        service.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.name}</TableCell>
                          <TableCell>{service.price.toLocaleString()} บาท</TableCell>
                          <TableCell>{service.duration}</TableCell>
                          <TableCell>{service.description}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit('service', service)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete('service', service.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records">
            <Card>
              <CardHeader>
                <CardTitle>ประวัติการให้บริการ</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>วันที่</TableHead>
                      <TableHead>ลูกค้า</TableHead>
                      <TableHead>บริการ</TableHead>
                      <TableHead>ยอดเงิน</TableHead>
                      <TableHead>สถานะ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceRecords
                      .filter(record => 
                        record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        record.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell className="font-medium">{record.customerName}</TableCell>
                          <TableCell>{record.serviceName}</TableCell>
                          <TableCell>{record.amount.toLocaleString()} บาท</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              record.status === 'เสร็จสิ้น' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {record.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataManagement;