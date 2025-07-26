import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, MapPin, CreditCard, Smartphone, Copy, Check } from "lucide-react";
import { useState } from "react";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState<'bank' | 'qr'>('bank');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  // Mock cart data - in real app, this would come from state management
  const cartItems = [
    { id: 1, name: "ล้างรถพื้นฐาน", price: 299, quantity: 1 },
    { id: 2, name: "ดีเทลภายใน", price: 599, quantity: 1 }
  ];

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("1234567890");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log("Payment submitted");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            กลับสู่หน้าแรก
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">ชำระเงิน</h1>
            <p className="text-muted-foreground">ตรวจสอบรายการและดำเนินการชำระเงิน</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Order Summary & Customer Info */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    สรุปการสั่งซื้อ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">จำนวน: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">฿{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>ยอดรวมทั้งหมด</span>
                    <span className="text-primary">฿{totalAmount.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>ข้อมูลลูกค้า</CardTitle>
                  <CardDescription>กรุณากรอกข้อมูลของท่านให้ครบถ้วน</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">ชื่อ</Label>
                      <Input id="firstName" placeholder="ชื่อ" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">นามสกุล</Label>
                      <Input id="lastName" placeholder="นามสกุล" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                    <Input id="phone" placeholder="0xx-xxx-xxxx" />
                  </div>
                  <div>
                    <Label htmlFor="address">ที่อยู่</Label>
                    <Textarea id="address" placeholder="ที่อยู่สำหรับการให้บริการ" rows={3} />
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    ตำแหน่งที่อยู่
                  </CardTitle>
                  <CardDescription>ปักหมุดตำแหน่งสำหรับการให้บริการ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Google Maps จะแสดงที่นี่</p>
                      <Button variant="outline" className="mt-2">เลือกตำแหน่ง</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Payment Methods */}
            <div className="space-y-6">
              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>วิธีการชำระเงิน</CardTitle>
                  <CardDescription>เลือกวิธีการชำระเงินที่สะดวกสำหรับท่าน</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Bank Transfer */}
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === 'bank' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPayment('bank')}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPayment === 'bank' ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`} />
                        <span className="font-medium">โอนเงินผ่านธนาคาร</span>
                      </div>
                    </div>
                    {selectedPayment === 'bank' && (
                      <div className="space-y-3 pl-7">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">ธนาคารกสิกรไทย</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">เลขบัญชี: 1234567890</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={copyAccountNumber}
                              className="h-6 px-2"
                            >
                              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            </Button>
                          </div>
                          <p className="text-sm">ชื่อบัญชี: Goofitre Car Care</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* QR Code Payment */}
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === 'qr' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPayment('qr')}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPayment === 'qr' ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`} />
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span className="font-medium">QR Code (PromptPay)</span>
                        </div>
                      </div>
                    </div>
                    {selectedPayment === 'qr' && (
                      <div className="pl-7">
                        <div className="bg-muted p-4 rounded-lg flex flex-col items-center">
                          <div className="w-32 h-32 bg-white border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center mb-2">
                            <p className="text-xs text-center text-muted-foreground">QR Code<br />จะแสดงที่นี่</p>
                          </div>
                          <p className="text-sm text-center">สแกน QR Code เพื่อชำระเงิน<br />฿{totalAmount.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Receipt Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    แนบหลักฐานการชำระเงิน
                  </CardTitle>
                  <CardDescription>อัปโหลดรูปภาพสลิปการโอนเงิน</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="receipt-upload"
                      />
                      <label 
                        htmlFor="receipt-upload" 
                        className="cursor-pointer flex flex-col items-center text-center"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">คลิกเพื่อเลือกไฟล์</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ไฟล์ที่รองรับ: JPG, PNG (ขนาดสูงสุด 5MB)
                        </p>
                      </label>
                    </div>
                    {uploadedFile && (
                      <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{uploadedFile.name}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <form onSubmit={handleSubmit}>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={!uploadedFile}
                >
                  ยืนยันการชำระเงิน
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;