import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Star, CheckCircle, Car, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Walk-in services with simplified pricing
const walkInServices = [
  {
    id: 1,
    title: "ล้างรถด่วน",
    description: "ล้างรถภายนอก ทำความสะอาดเบื้องต้น",
    price: "150 บาท",
    duration: "30 นาที",
    image: "/src/assets/car-wash.jpg",
    features: ["ล้างรถภายนอก", "เช็ดแห้ง", "ทำความสะอาดกระจก"],
    available: true
  },
  {
    id: 2,
    title: "ล้างรถ + เคลือบสี",
    description: "ล้างรถพร้อมเคลือบสีป้องกัน",
    price: "350 บาท",
    duration: "60 นาที", 
    image: "/src/assets/car-polish.jpg",
    features: ["ล้างรถภายนอก", "เคลือบสีป้องกัน", "ทำความสะอาดกระจก", "เช็ดแห้ง"],
    available: true,
    popular: true
  },
  {
    id: 3,
    title: "ดูดฝุ่นภายใน",
    description: "ทำความสะอาดภายในรถ",
    price: "200 บาท",
    duration: "45 นาที",
    image: "/src/assets/interior-clean.jpg", 
    features: ["ดูดฝุ่นเบาะ", "ทำความสะอาดแผงหน้าปัด", "เช็ดภายใน"],
    available: true
  },
  {
    id: 4,
    title: "ล้างเครื่องยนต์",
    description: "ทำความสะอาดห้องเครื่องยนต์",
    price: "300 บาท", 
    duration: "45 นาที",
    image: "/src/assets/engine-clean.jpg",
    features: ["ล้างห้องเครื่องยนต์", "ทำความสะอาดชิ้นส่วน", "ตรวจสอบระบบ"],
    available: false
  }
];

const WalkInService = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  
  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selectedServiceData = walkInServices.filter(service => 
    selectedServices.includes(service.id)
  );

  const totalPrice = selectedServiceData.reduce((sum, service) => {
    return sum + parseInt(service.price.replace(/[^\d]/g, ''));
  }, 0);

  const maxDuration = Math.max(
    ...selectedServiceData.map(service => parseInt(service.duration.replace(/[^\d]/g, '')))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              กลับ
            </Button>
            <div className="flex items-center gap-3">
              <Car className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">บริการลูกค้าหน้าร้าน</h1>
                <p className="text-muted-foreground">เลือกบริการที่ต้องการ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {walkInServices.map((service) => (
                <Card 
                  key={service.id}
                  className={`group hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    selectedServices.includes(service.id) 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : ''
                  } ${!service.available ? 'opacity-60' : ''}`}
                  onClick={() => service.available && handleServiceToggle(service.id)}
                >
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground">
                      ยอดนิยม
                    </Badge>
                  )}
                  
                  {!service.available && (
                    <Badge className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground">
                      ไม่ว่าง
                    </Badge>
                  )}

                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-foreground">{service.title}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-primary">{service.price}</div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                    </div>

                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  {selectedServices.includes(service.id) && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  สรุปการเลือกบริการ
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {selectedServiceData.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    กรุณาเลือกบริการที่ต้องการ
                  </p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {selectedServiceData.map((service) => (
                        <div key={service.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">{service.title}</p>
                            <p className="text-xs text-muted-foreground">{service.duration}</p>
                          </div>
                          <p className="font-bold">{service.price}</p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">เวลารวม:</span>
                        <span className="text-primary font-bold">{maxDuration} นาที</span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">ราคารวม:</span>
                        <span className="text-primary font-bold">{totalPrice.toLocaleString()} บาท</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>

              <CardFooter className="space-y-2">
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={selectedServiceData.length === 0}
                  onClick={() => navigate('/payment', { 
                    state: { 
                      services: selectedServiceData,
                      total: totalPrice,
                      type: 'walk-in'
                    }
                  })}
                >
                  ดำเนินการต่อ
                </Button>
                
                {selectedServices.length > 0 && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedServices([])}
                  >
                    ล้างทั้งหมด
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkInService;