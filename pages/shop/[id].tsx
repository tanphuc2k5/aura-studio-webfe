import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/utils/mockData";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  // Tìm sản phẩm dựa trên ID
  const product = PRODUCTS.find((p) => p.id === id);

  // States cho việc lựa chọn
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-aura-gray-dark">Đang tải sản phẩm hoặc sản phẩm không tồn tại...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Vui lòng chọn Kích thước và Màu sắc trước khi thêm vào giỏ hàng.", {
        style: {
          borderRadius: '10px',
          background: '#111',
          color: '#fff',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        },
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedSize,
      selectedColor,
      quantity,
    });

    toast.success(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng thành công!`, {
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{product.name} | Aura Studio</title>
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-[3/4] bg-aura-gray-light overflow-hidden group rounded-[2rem]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="aspect-[3/4] bg-aura-gray-light cursor-pointer overflow-hidden border border-transparent hover:border-aura-black transition-all rounded-xl"
                >
                  <img 
                    src={product.images[0]} 
                    alt="" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 opacity-80 hover:opacity-100" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col">
            <nav className="mb-8 text-[10px] uppercase tracking-widest text-aura-gray-dark flex space-x-2">
              <span className="hover:text-aura-black cursor-pointer">Trang chủ</span>
              <span>/</span>
              <span className="hover:text-aura-black cursor-pointer">{product.category}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-medium mb-4">{product.name}</h1>
            <p className="text-xl text-aura-black mb-8">
              {product.price.toLocaleString("vi-VN")} VNĐ
            </p>

            <div className="border-t border-aura-gray-medium pt-8 mb-8">
              <p className="text-sm text-aura-gray-dark leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest">Kích thước</h3>
                <button className="text-[10px] uppercase tracking-widest border-b border-aura-black">Bảng size</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[60px] h-12 border text-xs flex items-center justify-center transition-all ${
                      selectedSize === size
                        ? "bg-aura-black text-white border-aura-black"
                        : "border-aura-gray-medium text-aura-black hover:border-aura-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Màu sắc</h3>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`group flex items-center space-x-2 transition-all`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border border-aura-gray-medium flex items-center justify-center ${
                        selectedColor === color ? "ring-2 ring-aura-black ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: color.toLowerCase().replace(" ", "") }}
                    />
                    <span className={`text-[10px] uppercase tracking-widest ${
                      selectedColor === color ? "font-bold" : "text-aura-gray-dark"
                    }`}>
                      {color}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center border border-aura-gray-medium w-fit h-14 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-6 h-full hover:bg-aura-gray-light transition-colors"
                >
                  -
                </button>
                <span className="px-6 text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-6 h-full hover:bg-aura-gray-light transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-aura-black text-white py-6 text-sm font-bold uppercase tracking-widest hover:bg-aura-gray-dark transition-colors duration-300 rounded-xl"
              >
                Thêm vào giỏ hàng
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 space-y-4 border-t border-aura-gray-medium pt-8">
              <div className="flex items-center text-[10px] uppercase tracking-widest text-aura-gray-dark">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-4.446-3.505-8.103-7.907-8.103a8.04 8.04 0 0 0-4.422 1.303m13.454 11.303c0-1.656-1.344-3-3-3H16.5m-11.25 0h1.5a1.5 1.5 0 0 1 1.5 1.5v3.75" />
                </svg>
                Miễn phí vận chuyển cho đơn hàng trên 2.000.000 VNĐ
              </div>
              <div className="flex items-center text-[10px] uppercase tracking-widest text-aura-gray-dark">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Đổi trả dễ dàng trong vòng 30 ngày
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
