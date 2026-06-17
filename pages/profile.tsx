import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const { tab } = router.query;
  const { user, orders, updateUser, isAuthenticated } = useAuth();
  
  const [activeTab, setActiveTab] = useState("account");
  const [editUser, setEditUser] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (tab === "orders") setActiveTab("orders");
    else setActiveTab("account");
  }, [tab]);

  useEffect(() => {
    if (user) {
      setEditUser({ name: user.name, email: user.email, phone: user.phone || "" });
    }
  }, [user]);

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(editUser);
    toast.success("Cập nhật thông tin thành công!");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head><title>Hồ sơ của tôi | Aura Studio</title></Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-luxury mb-16 text-center">Tài khoản của tôi</h1>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 space-y-6">
            <button 
              onClick={() => { setActiveTab("account"); router.push("/profile?tab=account", undefined, { shallow: true }); }}
              className={`block w-full text-left text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === "account" ? "border-aura-black text-aura-black" : "border-transparent text-aura-gray-dark hover:text-aura-black"}`}
            >
              Hồ sơ cá nhân
            </button>
            <button 
              onClick={() => { setActiveTab("orders"); router.push("/profile?tab=orders", undefined, { shallow: true }); }}
              className={`block w-full text-left text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === "orders" ? "border-aura-black text-aura-black" : "border-transparent text-aura-gray-dark hover:text-aura-black"}`}
            >
              Lịch sử đơn hàng
            </button>
          </aside>

          {/* Content */}
          <section className="flex-grow">
            {activeTab === "account" ? (
              <div className="max-w-xl">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-8">Thông tin cá nhân</h2>
                <form onSubmit={handleUpdateAccount} className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Họ và tên</label>
                    <input type="text" value={editUser.name} onChange={(e) => setEditUser({...editUser, name: e.target.value})} className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Email</label>
                    <input type="email" value={editUser.email} onChange={(e) => setEditUser({...editUser, email: e.target.value})} className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Số điện thoại</label>
                    <input type="tel" value={editUser.phone} onChange={(e) => setEditUser({...editUser, phone: e.target.value})} className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors" />
                  </div>
                  <button type="submit" className="bg-aura-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-aura-gray-dark transition-all rounded-full">Lưu thay đổi</button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold uppercase tracking-widest mb-8">Đơn hàng của bạn</h2>
                {orders.length > 0 ? (
                  <div className="space-y-8">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-aura-gray-medium rounded-[2rem] overflow-hidden">
                        <div className="bg-aura-gray-light px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                          <div className="flex gap-8">
                            <div><p className="text-aura-gray-dark mb-1">Mã đơn hàng</p><p>{order.id}</p></div>
                            <div><p className="text-aura-gray-dark mb-1">Ngày đặt</p><p>{order.date}</p></div>
                          </div>
                          <div><p className="text-aura-gray-dark mb-1">Trạng thái</p><p className="text-blue-600">{order.status}</p></div>
                        </div>
                        <div className="p-8">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-6 mb-6 last:mb-0">
                              <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-xl" />
                              <div className="flex-grow">
                                <h4 className="text-xs font-bold uppercase">{item.name}</h4>
                                <p className="text-[10px] text-aura-gray-dark mt-1">Size: {item.selectedSize} / Color: {item.selectedColor} x {item.quantity}</p>
                              </div>
                              <p className="text-xs font-bold">{(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
                            </div>
                          ))}
                        </div>
                        <div className="px-8 py-6 border-t border-aura-gray-light text-right">
                          <span className="text-[10px] uppercase tracking-widest text-aura-gray-dark mr-4">Tổng cộng:</span>
                          <span className="text-xl font-bold">{order.totalPrice.toLocaleString("vi-VN")}đ</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center bg-aura-gray-light rounded-[2rem] border-2 border-dashed border-aura-gray-medium">
                    <p className="text-aura-gray-dark italic mb-6">Bạn chưa có đơn hàng nào.</p>
                    <Link href="/shop" className="text-xs font-bold uppercase tracking-widest bg-aura-black text-white px-8 py-3 rounded-full">Mua sắm ngay</Link>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Link from "next/link";
