import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Custom Hook để xử lý hiệu ứng Scroll Reveal
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Ngừng theo dõi sau khi đã hiển thị
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2, // Trigger khi 20% element xuất hiện
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
};

// Component Wrapper cho hiệu ứng Fade Up
const FadeUpSection: React.FC<{ children: React.ReactNode; delay?: string }> = ({ children, delay = "delay-0" }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${delay} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Về chúng tôi | Aura Studio</title>
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Phần 1: Hero Banner */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000&grayscale=true"
              alt="Aura Studio Background"
              className="w-full h-full object-cover filter grayscale"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-luxury uppercase mb-6 animate-fade-in">
              Aura Studio
            </h1>
            <p className="text-sm md:text-xl font-light tracking-widest uppercase animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              The Art of Less
            </p>
          </div>
        </section>

        {/* Phần 2: Câu chuyện thương hiệu (Our Story) */}
        <section className="py-24 md:py-32 container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="w-full md:w-1/2">
              <FadeUpSection>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-aura-gray-dark mb-6">Câu chuyện của chúng tôi</h2>
                <h3 className="text-3xl md:text-4xl font-medium mb-8 leading-tight">Khởi nguồn từ sự tĩnh lặng giữa phố thị ồn ào.</h3>
                <div className="space-y-6 text-sm text-aura-gray-dark leading-relaxed">
                  <p>
                    Được thành lập vào năm 2025, Aura Studio không bắt đầu như một thương hiệu thời trang chạy theo xu hướng. Chúng tôi bắt đầu với một câu hỏi: "Tại sao tủ quần áo của chúng ta luôn đầy ắp nhưng lại chẳng có gì để mặc?".
                  </p>
                  <p>
                    Câu trả lời nằm ở sự dư thừa của những thiết kế chóng vánh (fast-fashion). Aura Studio ra đời mang theo sứ mệnh tạo ra một giải pháp thay thế: Những món đồ cơ bản (basics) được nâng tầm bởi chất liệu hảo hạng, cắt may tinh tế và form dáng trường tồn với thời gian.
                  </p>
                  <p>
                    Chúng tôi tin rằng phong cách thực sự không đến từ việc đắp lên mình thật nhiều thứ, mà là biết cách lược bỏ đi những yếu tố không cần thiết để giữ lại giá trị cốt lõi.
                  </p>
                </div>
              </FadeUpSection>
            </div>
            <div className="w-full md:w-1/2">
              <FadeUpSection delay="delay-200">
                <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1558769132-cb1fac0840c2?auto=format&fit=crop&q=80&w=1200"
                    alt="Aura Studio Workspace"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </FadeUpSection>
            </div>
          </div>
        </section>

        {/* Phần 3: Triết lý thiết kế & Chất liệu (Philosophy & Sustainability) */}
        <section className="py-24 md:py-32 bg-aura-gray-light">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2">
                <FadeUpSection>
                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-aura-gray-dark mb-6">Triết lý & Chất liệu</h2>
                  <h3 className="text-3xl md:text-4xl font-medium mb-8 leading-tight">Hoàn hảo từ những chi tiết nhỏ nhất.</h3>
                  <div className="space-y-6 text-sm text-aura-gray-dark leading-relaxed">
                    <p>
                      <strong>Chất liệu bền vững:</strong> Tối giản cũng có nghĩa là bảo vệ môi trường. Chúng tôi ưu tiên sử dụng cotton hữu cơ, lụa tự nhiên và linen thoáng mát. Một sản phẩm chất lượng cao có thể thay thế cho 10 sản phẩm kém chất lượng, giúp giảm thiểu đáng kể rác thải thời trang.
                    </p>
                    <p>
                      <strong>Gia công tinh xảo:</strong> Chúng tôi làm việc trực tiếp với những nghệ nhân lành nghề nhất. Thay vì sản xuất hàng loạt, mỗi bộ sưu tập của Aura Studio đều được sản xuất với số lượng giới hạn để đảm bảo sự kiểm tra chất lượng khắt khe nhất trong từng đường kim, mũi chỉ.
                    </p>
                  </div>
                </FadeUpSection>
              </div>
              <div className="w-full md:w-1/2">
                <FadeUpSection delay="delay-200">
                  <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1200"
                      alt="Aura Studio Fabric"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                </FadeUpSection>
              </div>
            </div>
          </div>
        </section>

        {/* Phần 4: Khối thông tin liên hệ & Bản đồ giả lập */}
        <section className="py-24 md:py-32 container mx-auto px-4 md:px-8">
          <FadeUpSection>
            <div className="text-center mb-16">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-aura-gray-dark mb-4">Ghé thăm chúng tôi</h2>
              <p className="text-3xl font-medium">Trải nghiệm không gian Aura</p>
            </div>
          </FadeUpSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contact Info */}
            <FadeUpSection delay="delay-100">
              <div className="bg-aura-black text-white p-12 md:p-16 rounded-[2rem] space-y-12">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-aura-accent mb-3">Địa chỉ Cửa hàng Flagship</h4>
                  <p className="text-lg leading-relaxed">
                    123 Đường Tối Giản, Khu phố Thiết Kế<br />
                    Quận 1, TP. Hồ Chí Minh<br />
                    Việt Nam
                  </p>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-aura-accent mb-3">Giờ mở cửa</h4>
                  <p className="text-lg leading-relaxed">
                    Thứ Hai - Chủ Nhật<br />
                    09:00 Sáng - 21:00 Tối
                  </p>
                </div>

                <div className="border-t border-white/20 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-aura-accent mb-2">Điện thoại</h4>
                    <p className="text-sm">090 123 4567</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-aura-accent mb-2">Email</h4>
                    <p className="text-sm">hello@aurastudio.vn</p>
                  </div>
                </div>
              </div>
            </FadeUpSection>

            {/* Map Mockup */}
            <FadeUpSection delay="delay-300">
              <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden group bg-aura-gray-medium">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
                  alt="Aura Studio Map Location"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-3 transform group-hover:-translate-y-6 transition-transform duration-500">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aura-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-aura-black"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-aura-black">Aura Flagship</span>
                </div>
              </div>
            </FadeUpSection>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
