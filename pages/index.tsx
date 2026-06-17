import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/utils/mockData";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

const BANNERS = [
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
    title: "The Art of Less",
    subtitle: "Bộ sưu tập Xuân Hè 2026",
  },
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000",
    title: "Urban Elegance",
    subtitle: "Phong cách tối giản thành thị",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000",
    title: "Sustainable Fashion",
    subtitle: "Chất liệu thân thiện môi trường",
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000",
    title: "Timeless Basics",
    subtitle: "Đẳng cấp từ sự đơn giản",
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-carousel logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickAdd = (product: typeof PRODUCTS[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
      quantity: 1,
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`, {
      style: {
        borderRadius: '10px',
        background: '#111',
        color: '#fff',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
    });
  };

  const categories = [
    { name: "Quần áo", image: "https://images.unsplash.com/photo-1489987707023-afc82478163a?auto=format&fit=crop&q=80&w=800", link: "/shop?category=Clothing" },
    { name: "Giày dép", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800", link: "/shop?category=Shoes" },
    { name: "Mũ nón", image: "https://images.unsplash.com/photo-1521369909029-2afed882ba91?auto=format&fit=crop&q=80&w=800", link: "/shop?category=Hats" },
    { name: "Phụ kiện", image: "https://images.unsplash.com/photo-1511405946472-a37e3b5ccd47?auto=format&fit=crop&q=80&w=800", link: "/shop?category=Accessories" },
  ];

  const testimonials = [
    {
      name: "Nguyễn Hoàng Linh",
      rating: 5,
      content: "Chất liệu vải cực kỳ thoáng mát và đứng form. Đây là lần thứ 3 tôi mua áo sơ mi ở Aura Studio.",
    },
    {
      name: "Trần Minh Quân",
      rating: 5,
      content: "Dịch vụ khách hàng tuyệt vời. Đóng gói hộp rất sang trọng, mở ra còn có mùi thơm nhẹ.",
    },
    {
      name: "Lê Ngọc Hân",
      rating: 5,
      content: "Thực sự yêu thích phong cách The Art of Less của shop. Đồ basic nhưng chất lượng.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Aura Studio | Thời Trang Tối Giản & Sang Trọng</title>
      </Head>

      <Header />

      <main className="flex-grow">
        {/* 1. Hero Section with Carousel */}
        <section className="relative h-[85vh] overflow-hidden">
          {BANNERS.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-5xl md:text-8xl font-bold tracking-luxury uppercase mb-6 transform translate-y-0 transition-transform duration-700">
                  {banner.title}
                </h1>
                <p className="text-lg md:text-2xl font-light mb-10 tracking-widest uppercase">
                  {banner.subtitle}
                </p>
                <Link
                  href="/shop"
                  className="inline-block bg-white text-aura-black px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-aura-black hover:text-white transition-all duration-300 rounded-full"
                >
                  Khám phá ngay
                </Link>
              </div>
            </div>
          ))}
          {/* Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-12 h-1 transition-all ${i === currentSlide ? "bg-white" : "bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
        </section>

        {/* 2. Danh mục sản phẩm (Categories) */}
        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-aura-gray-dark mb-4">Danh mục</h2>
            <p className="text-3xl font-medium">Khám phá phong cách của bạn</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.map((cat, idx) => (
              <Link href={cat.link} key={idx} className="relative aspect-[3/4] md:aspect-square group overflow-hidden block rounded-2xl">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-center text-white">
                  <h3 className="text-sm md:text-lg font-bold uppercase tracking-widest mb-1 group-hover:-translate-y-2 transition-transform duration-300">{cat.name}</h3>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 border-b border-white pb-0.5">
                    Xem sản phẩm
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Sản phẩm bán chạy (Best Sellers) */}
        <section className="py-24 bg-aura-gray-light">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-aura-gray-dark mb-4">Best Sellers</h2>
                <p className="text-3xl font-medium">Sản phẩm nổi bật</p>
              </div>
              <Link href="/shop" className="hidden md:block text-sm font-bold uppercase tracking-widest border-b-2 border-aura-black pb-1 hover:text-aura-gray-dark hover:border-aura-gray-dark transition-colors">
                Xem tất cả
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {PRODUCTS.slice(0, 4).map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-white rounded-2xl">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="absolute bottom-0 left-0 right-0 bg-aura-black text-white py-4 text-xs font-bold uppercase tracking-widest opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Thêm nhanh vào giỏ
                    </button>
                  </div>
                  <Link href={`/shop/${product.id}`}>
                    <h3 className="text-sm font-medium mb-2 group-hover:underline truncate">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-aura-gray-dark">
                    {product.price.toLocaleString("vi-VN")} VNĐ
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Chương trình khuyến mãi (Campaign) */}
        <section className="py-24 container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center bg-aura-black text-white overflow-hidden rounded-[2.5rem]">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[600px] relative">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1600"
                alt="Campaign"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="w-full md:w-1/2 p-12 md:p-24 text-center md:text-left flex flex-col justify-center">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-aura-accent mb-6">Mùa hè sôi động</h2>
              <p className="text-4xl md:text-5xl font-bold uppercase tracking-luxury mb-6 leading-tight">Giảm giá 20%</p>
              <p className="text-sm text-aura-gray-medium mb-12 leading-relaxed max-w-md mx-auto md:mx-0">
                Làm mới tủ đồ của bạn với bộ sưu tập những món đồ cơ bản nhưng không hề đơn điệu.
              </p>
              <div>
                <Link
                  href="/shop"
                  className="inline-block bg-white text-aura-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-aura-gray-medium transition-colors rounded-full"
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Đánh giá của khách hàng (Testimonials) */}
        <section className="py-24 bg-white border-t border-aura-gray-light">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-aura-gray-dark mb-4">Đánh giá</h2>
              <p className="text-3xl font-medium">Khách hàng nói gì về chúng tôi</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((review, idx) => (
                <div key={idx} className="bg-aura-gray-light p-8 md:p-12 flex flex-col items-center text-center rounded-[2rem]">
                  <div className="flex space-x-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-aura-black">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium leading-relaxed italic mb-8 flex-grow text-aura-gray-dark">
                    "{review.content}"
                  </p>
                  <p className="text-xs font-bold uppercase tracking-widest">— {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Brand Philosophy */}
        <section className="py-32 bg-aura-black text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] mb-12 text-aura-accent">Triết lý Aura</h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed italic text-white">
              "Chúng tôi không chỉ bán quần áo. Chúng tôi kiến tạo một lối sống tối giản, nơi mỗi sản phẩm đều mang trong mình hơi thở của nghệ thuật và sự bền bỉ với thời gian."
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
