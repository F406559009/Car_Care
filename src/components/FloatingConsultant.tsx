import { useState } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FloatingConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-300 animate-pulse"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">
                💬 ปรึกษาทีมงาน
              </DialogTitle>
              <DialogDescription className="text-center">
                ทีมงานของเราพร้อมแนะนำบริการที่เหมาะสมกับรถและงบประมาณของคุณ
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">ช่องทางติดต่อ</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">โทรสอบถาม</p>
                      <p className="text-sm text-muted-foreground">02-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">อีเมล</p>
                      <p className="text-sm text-muted-foreground">info@carcare.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">เวลาให้บริการ</h4>
                <p className="text-sm text-muted-foreground">
                  จันทร์ - เสาร์: 08:00 - 18:00<br />
                  อาทิตย์: 09:00 - 17:00
                </p>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1 bg-gradient-primary text-white hover:shadow-glow"
                  onClick={() => window.open('tel:02-123-4567')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  โทรเลย
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  ปิด
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default FloatingConsultant;