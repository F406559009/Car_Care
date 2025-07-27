import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Clock, CheckCircle, AlertCircle, MapPin, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  location: string;
  scheduledTime: string;
  status: "pending" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  notes?: string;
}

const EmployeeTasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      customerName: "คุณสมชาย ใจดี",
      customerPhone: "081-234-5678",
      service: "ล้างรถ + เคลือบสี",
      location: "123 ถนนสุขุมวิท แขวงคลองตัน กรุงเทพ",
      scheduledTime: "2024-01-20 09:00",
      status: "pending",
      priority: "high",
      notes: "รถสีดำ BMW X3"
    },
    {
      id: "2",
      customerName: "คุณสุดา รักสะอาด",
      customerPhone: "082-345-6789",
      service: "ดูดฝุ่นภายใน + ล้างเครื่องยนต์",
      location: "456 ซอยเอกมาย แขวงวัฒนา กรุงเทพ",
      scheduledTime: "2024-01-20 11:00",
      status: "pending",
      priority: "medium"
    },
    {
      id: "3",
      customerName: "คุณปรีชา สะอาดดี",
      customerPhone: "083-456-7890",
      service: "ล้างรถ + ขัดเงา",
      location: "789 ถนนรัชดา แขวงห้วยขวาง กรุงเทพ",
      scheduledTime: "2024-01-20 08:30",
      status: "in-progress",
      priority: "high"
    },
    {
      id: "4",
      customerName: "คุณมานี ชอบใหม่",
      customerPhone: "084-567-8901",
      service: "ล้างรถ",
      location: "321 ถนนพหลโยธิน แขวงจตุจักร กรุงเทพ",
      scheduledTime: "2024-01-19 14:00",
      status: "completed",
      priority: "low"
    }
  ]);

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "อัปเดตสถานะงานสำเร็จ",
      description: `เปลี่ยนสถานะงานเป็น ${newStatus === "in-progress" ? "กำลังดำเนินการ" : newStatus === "completed" ? "เสร็จสิ้น" : "รอดำเนินการ"}`,
    });
  };

  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"><Clock className="w-3 h-3 mr-1" />รอดำเนินการ</Badge>;
      case "in-progress":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200"><AlertCircle className="w-3 h-3 mr-1" />กำลังดำเนินการ</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200"><CheckCircle className="w-3 h-3 mr-1" />เสร็จสิ้น</Badge>;
    }
  };

  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">สำคัญ</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">ปานกลาง</Badge>;
      case "low":
        return <Badge variant="outline">ต่ำ</Badge>;
    }
  };

  const filterTasks = (status?: Task["status"]) => {
    return status ? tasks.filter(task => task.status === status) : tasks;
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-lg">{task.customerName}</CardTitle>
          </div>
          <div className="flex gap-2">
            {getPriorityBadge(task.priority)}
            {getStatusBadge(task.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{task.customerPhone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{task.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>นัดหมาย: {new Date(task.scheduledTime).toLocaleString('th-TH')}</span>
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium">บริการ: {task.service}</p>
            {task.notes && (
              <p className="text-sm text-muted-foreground mt-1">หมายเหตุ: {task.notes}</p>
            )}
          </div>
          
          <div className="flex gap-2 pt-2">
            {task.status === "pending" && (
              <Button 
                onClick={() => updateTaskStatus(task.id, "in-progress")}
                className="flex-1"
              >
                เริ่มงาน
              </Button>
            )}
            {task.status === "in-progress" && (
              <Button 
                onClick={() => updateTaskStatus(task.id, "completed")}
                variant="accent"
                className="flex-1"
              >
                เสร็จสิ้น
              </Button>
            )}
            {task.status === "completed" && (
              <Button variant="outline" disabled className="flex-1">
                งานเสร็จสิ้นแล้ว
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">งานของพนักงาน</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{filterTasks("pending").length}</p>
                  <p className="text-sm text-muted-foreground">รอดำเนินการ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{filterTasks("in-progress").length}</p>
                  <p className="text-sm text-muted-foreground">กำลังดำเนินการ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{filterTasks("completed").length}</p>
                  <p className="text-sm text-muted-foreground">เสร็จสิ้น</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{tasks.length}</p>
                  <p className="text-sm text-muted-foreground">ทั้งหมด</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
            <TabsTrigger value="pending">รอดำเนินการ</TabsTrigger>
            <TabsTrigger value="in-progress">กำลังดำเนินการ</TabsTrigger>
            <TabsTrigger value="completed">เสร็จสิ้น</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {filterTasks("pending").map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="mt-6">
            <div className="space-y-4">
              {filterTasks("in-progress").map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {filterTasks("completed").map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeTasks;