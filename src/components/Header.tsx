import { Button } from "@/components/ui/button";
import { Car, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import NotificationSystem from "./NotificationSystem";
import Cart, { CartItem } from "./Cart";

interface HeaderProps {
  cartItems?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onClearCart?: () => void;
}

const Header = ({ cartItems = [], onUpdateQuantity, onRemoveItem, onClearCart }: HeaderProps) => {
  return (
    <header className="bg-card shadow-card border-b border-border">
      {/* Top Contact Bar */}
      <div className="bg-gradient-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>082-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 ถนนกรุงเทพ กรุงเทพฯ 10110</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>จันทร์-อาทิตย์ 8:00-20:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Goofitre</h1>
              <p className="text-sm text-muted-foreground">Car Care Center</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              หน้าแรก
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              บริการ
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              เกี่ยวกับเรา
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              ติดต่อ
            </a>
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <NotificationSystem />
            <Cart 
              items={cartItems}
              onUpdateQuantity={onUpdateQuantity || (() => {})}
              onRemoveItem={onRemoveItem || (() => {})}
              onClearCart={onClearCart || (() => {})}
            />
            <Link to="/login">
              <Button variant="outline" size="sm">
                เข้าสู่ระบบ
              </Button>
            </Link>
            <Button variant="hero" size="sm">
              จองบริการ
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;