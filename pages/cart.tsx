import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Giỏ hàng | Aura Studio</title>
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-luxury mb-16 text-center">Giỏ hàng của bạn</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* List of items */}
            <div className="lg:col-span-2 space-y-8">
              <div className="hidden md:grid grid-cols-6 border-b border-aura-gray-medium pb-4 text-[10px] uppercase tracking-widest text-aura-gray-dark font-bold">
                <div className="col-span-3">Sản phẩm</div>
                <div className="text-center">Giá</div>
                <div className="text-center">Số lượng</div>
                <div className="text-right">Tổng cộng</div>
              </div>

              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 border-b border-aura-gray-medium pb-8"
                >
                  {/* Product Info */}
                  <div className="md:col-span-3 flex items-center space-x-6">
                    <div className="w-24 aspect-[3/4] bg-aura-gray-light flex-shrink-0 rounded-xl overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wide mb-1">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-aura-gray-dark mb-4">
                        Size: {item.selectedSize} / Màu: {item.selectedColor}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-[10px] uppercase tracking-widest text-aura-gray-dark border-b border-aura-gray-dark hover:text-aura-black hover:border-aura-black transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="hidden md:block text-center text-sm">
                    {item.price.toLocaleString("vi-VN")}đ
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex justify-center">
                    <div className="flex items-center border border-aura-gray-medium h-10">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="px-3 hover:bg-aura-gray-light transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="px-3 hover:bg-aura-gray-light transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right font-bold text-sm">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </div>
                </div>
              ))}

              <div className="pt-8">
                <Link
                  href="/shop"
                  className="text-xs font-bold uppercase tracking-widest border-b-2 border-aura-black pb-1 hover:text-aura-gray-dark hover:border-aura-gray-dark transition-colors"
                >
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-aura-gray-light p-8 sticky top-28">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 border-b border-aura-gray-medium pb-4">
                  Tổng kết đơn hàng
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-aura-gray-dark">Số lượng</span>
                    <span>{totalItems} sản phẩm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-aura-gray-dark">Tạm tính</span>
                    <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-aura-gray-dark">Vận chuyển</span>
                    <span className="text-[10px] uppercase tracking-widest">Miễn phí</span>
                  </div>
                </div>
                <div className="border-t border-aura-gray-medium pt-4 mb-10 flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest">Tổng cộng</span>
                  <span className="text-2xl font-bold">{totalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-aura-black text-white text-center py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-aura-gray-dark transition-colors duration-300"
                >
                  Tiến hành thanh toán
                </Link>
                <p className="mt-6 text-[10px] text-aura-gray-dark text-center uppercase tracking-widest leading-relaxed">
                  Thuế VAT đã được bao gồm trong giá sản phẩm.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-aura-gray-dark uppercase tracking-[0.2em] mb-12">Giỏ hàng của bạn đang trống</p>
            <Link
              href="/shop"
              className="inline-block bg-aura-black text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-aura-gray-dark transition-colors duration-300"
            >
              Bắt đầu mua sắm
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
