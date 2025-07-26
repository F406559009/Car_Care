import { Button } from "@/components/ui/button";
import { Star, Shield, Award, Users } from "lucide-react";
import heroImage from "@/assets/hero-car-care.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Goofitre Car Care"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-white/90 font-medium">4.8/5 จาก 2,847 รีวิว</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            บริการ
            <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
              คาร์แคร์
            </span>
            <br />
            ระดับพรีเมียม
          </h1>

          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            ดูแลรถของคุณด้วยเทคโนโลยีล้ำสมัย ผลิตภัณฑ์คุณภาพสูง 
            และทีมงานมืออาชีพ เพื่อให้รถของคุณเปล่งประกายเสมือนใหม่
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="lg" className="text-lg">
              จองบริการเลย
            </Button>
            <Button variant="outline" size="lg" className="text-lg bg-white/10 border-white/30 text-white hover:bg-white/20">
              ดูบริการทั้งหมด
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">10,000+</div>
              <div className="text-white/70 text-sm">ลูกค้าพึงพอใจ</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-white/70 text-sm">ปีของการันตี</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-white/70 text-sm">รางวัลคุณภาพ</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-white/70 text-sm">คะแนนเฉลี่ย</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;