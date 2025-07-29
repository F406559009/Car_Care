import ServiceCard from "./ServiceCard";
import { Sparkles } from "lucide-react";
import carWashImage from "@/assets/car-wash.jpg";
import interiorCleanImage from "@/assets/interior-clean.jpg";
import carPolishImage from "@/assets/car-polish.jpg";
import engineCleanImage from "@/assets/engine-clean.jpg";

interface ServicesProps {
  onAddToCart?: (service: any) => void;
}

const Services = ({ onAddToCart }: ServicesProps) => {
  const services = [
    {
      title: "ล้างรถพื้นฐาน",
      description: "บริการล้างรถภายนอกและภายในแบบครบวงจร ด้วยผลิตภัณฑ์คุณภาพสูง",
      price: "฿299",
      duration: "45 นาที",
      image: carWashImage,
      features: [
        "ล้างรถภายนอกด้วยโฟมพิเศษ",
        "ดูดฝุ่นภายในรถ",
        "เช็ดกระจกทุกบาน",
        "ทำความสะอาดแดชบอร์ด",
        "รองเท้ายางและล้อ"
      ]
    },
    {
      title: "ดีเทลภายใน",
      description: "ทำความสะอาดภายในรถอย่างละเอียด เพื่อความสะอาดและสุขอนามัย",
      price: "฿599",
      duration: "90 นาที",
      image: interiorCleanImage,
      features: [
        "ดูดฝุ่นเบาะและพรมรถ",
        "ทำความสะอาดเบาะหนัง",
        "ขัดประกายแดชบอร์ด",
        "ทำความสะอาดกระจกภายใน",
        "น้ำหอมปรับอากาศ"
      ],
      popular: true
    },
    {
      title: "ขัดเคลือบสี",
      description: "บริการขัดเคลือบสีรถเพื่อความเงางามและป้องกันรอยขีดข่วน",
      price: "฿1,299",
      duration: "3 ชั่วโมง",
      image: carPolishImage,
      features: [
        "ขัดสีระดับมืออาชีพ",
        "เคลือบแว็กซ์คุณภาพสูง",
        "ป้องกันรังสี UV",
        "ใส่ยาง Black Coating",
        "รับประกัน 3 เดือน"
      ],
      discount: "ลด 30%"
    },
    {
      title: "ล้างห้องเครื่อง",
      description: "ทำความสะอาดห้องเครื่องยนต์อย่างปลอดภัยด้วยเทคนิคพิเศษ",
      price: "฿799",
      duration: "2 ชั่วโมง",
      image: engineCleanImage,
      features: [
        "ล้างห้องเครื่องยนต์",
        "ทำความสะอาดชิ้นส่วนพลาสติก",
        "เคลือบป้องกันสนิม",
        "ตรวจเช็คระบบเบื้องต้น",
        "ใส่น้ำยาขจัดกลิ่น"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="text-accent font-medium">บริการของเรา</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            บริการคาร์แคร์
            <span className="bg-gradient-primary bg-clip-text text-transparent"> ครบวงจร</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            เลือกบริการที่เหมาะกับความต้องการของคุณ ด้วยคุณภาพระดับมืออาชีพ
            และราคาที่คุ้มค่า
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              price={service.price}
              duration={service.duration}
              image={service.image}
              features={service.features}
              popular={service.popular}
              discount={service.discount}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;