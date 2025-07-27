import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, TrendingUp, Users, Car, ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const revenueData = [
    { month: "ม.ค.", revenue: 45000, orders: 85 },
    { month: "ก.พ.", revenue: 52000, orders: 92 },
    { month: "มี.ค.", revenue: 48000, orders: 88 },
    { month: "เม.ย.", revenue: 61000, orders: 105 },
    { month: "พ.ค.", revenue: 55000, orders: 98 },
    { month: "มิ.ย.", revenue: 67000, orders: 115 },
  ];

  const serviceData = [
    { name: "ล้างรถ", value: 35, color: "hsl(var(--primary))" },
    { name: "ขัดเคลือบ", value: 25, color: "hsl(var(--secondary))" },
    { name: "ทำความสะอาดภายใน", value: 20, color: "hsl(var(--accent))" },
    { name: "ล้างเครื่องยนต์", value: 20, color: "hsl(var(--muted))" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "คุณสมชาย", service: "ล้างรถ + ขัดเคลือบ", amount: 1200, status: "completed", date: "2024-01-27" },
    { id: "ORD-002", customer: "คุณสมหญิง", service: "ทำความสะอาดภายใน", amount: 800, status: "in-progress", date: "2024-01-27" },
    { id: "ORD-003", customer: "คุณวิชัย", service: "ล้างเครื่องยนต์", amount: 600, status: "pending", date: "2024-01-26" },
    { id: "ORD-004", customer: "คุณมาลี", service: "ล้างรถ", amount: 400, status: "completed", date: "2024-01-26" },
    { id: "ORD-005", customer: "คุณสุรชาติ", service: "ขัดเคลือบ", amount: 900, status: "completed", date: "2024-01-25" },
  ];

  const chartConfig = {
    revenue: {
      label: "รายได้",
      color: "hsl(var(--primary))",
    },
    orders: {
      label: "ออเดอร์",
      color: "hsl(var(--secondary))",
    },
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">เสร็จสิ้น</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">กำลังดำเนินการ</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">รอดำเนินการ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Dashboard รายงาน</h1>
              <p className="text-muted-foreground">ภาพรวมธุรกิจและผลประกอบการ</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 วันล่าสุด</SelectItem>
                <SelectItem value="30days">30 วันล่าสุด</SelectItem>
                <SelectItem value="3months">3 เดือนล่าสุด</SelectItem>
                <SelectItem value="6months">6 เดือนล่าสุด</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">รายได้รวม</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿328,000</div>
              <p className="text-xs text-muted-foreground">
                +12.5% จากเดือนที่แล้ว
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">จำนวนออเดอร์</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">583</div>
              <p className="text-xs text-muted-foreground">
                +8.2% จากเดือนที่แล้ว
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ลูกค้าใหม่</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +15.3% จากเดือนที่แล้ว
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ค่าเฉลี่ยต่อออเดอร์</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿563</div>
              <p className="text-xs text-muted-foreground">
                +3.1% จากเดือนที่แล้ว
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>รายได้รายเดือน</CardTitle>
              <CardDescription>
                เปรียบเทียบรายได้และจำนวนออเดอร์ใน 6 เดือนล่าสุด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Service Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>สัดส่วนบริการ</CardTitle>
              <CardDescription>
                การกระจายของบริการที่ให้บริการในเดือนนี้
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>ออเดอร์ล่าสุด</CardTitle>
            <CardDescription>
              รายการออเดอร์ที่เข้ามาใหม่ล่าสุด
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัสออเดอร์</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>บริการ</TableHead>
                  <TableHead>จำนวนเงิน</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>วันที่</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>฿{order.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มการเติบโต</CardTitle>
            <CardDescription>
              แสดงแนวโน้มรายได้และจำนวนออเดอร์ใน 6 เดือนล่าสุด
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;