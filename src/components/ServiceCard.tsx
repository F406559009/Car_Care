import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, CheckCircle } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
  popular?: boolean;
  discount?: string;
}

const ServiceCard = ({ 
  title, 
  description, 
  price, 
  duration, 
  image, 
  features, 
  popular = false,
  discount 
}: ServiceCardProps) => {
  return (
    <Card className="group hover:shadow-premium transition-all duration-300 hover:-translate-y-2 bg-gradient-card relative overflow-hidden">
      {popular && (
        <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground">
          ยอดนิยม
        </Badge>
      )}
      
      {discount && (
        <Badge className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground">
          {discount}
        </Badge>
      )}

      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">{price}</div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-foreground">รายละเอียดบริการ:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button 
          className="w-full" 
          variant={popular ? "hero" : "default"}
          size="lg"
        >
          เลือกบริการนี้
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;