import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { VIETNAM_LOCATIONS, Province, District } from "../utils/vietnamLocations";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated, addOrder } = useAuth();
  const router = useRouter();
  const [isOrdering, setIsOrdering] = useState(false);

  // States cho địa chỉ
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [addressDetail, setDetail] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để thanh toán.");
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && cart.length === 0) {
      router.push("/shop");
    }
  }, [cart, isAuthenticated, router]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const provinceObj = VIETNAM_LOCATIONS.find((p: Province) => p.id === selectedProvinceId);
    const districtObj = provinceObj?.districts.find((d: District) => d.id === selectedDistrictId);

    if (!provinceObj || !districtObj) {
      toast.error("Vui lòng chọn đầy đủ Tỉnh/Thành và Quận/Huyện");
      return;
    }

    setIsOrdering(true);

    const newOrder = {
      id: `AURA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toLocaleDateString("vi-VN"),
      items: [...cart],
      totalPrice,
      status: "Processing" as const,
      shippingAddress: {
        name: user?.name || "",
        phone,
        province: provinceObj.name,
        district: districtObj.name,
        detail: `${addressDetail}, ${districtObj.name}, ${provinceObj.name}`,
      },
    };

    addOrder(newOrder);
    toast.success("Đặt hàng thành công!", { duration: 4000 });
    clearCart();
    router.push("/shop/success");
  };

  const currentProvince = VIETNAM_LOCATIONS.find((p: Province) => p.id === selectedProvinceId);
  const districts = currentProvince ? currentProvince.districts : [];

  if (!isAuthenticated || cart.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head><title>Thanh toán | Aura Studio</title></Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-luxury mb-12">Thông tin giao hàng</h2>
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Họ và tên</label>
                  <input type="text" readOnly value={user?.name} className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none bg-aura-gray-light/50 px-2" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Số điện thoại</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Tỉnh / Thành phố</label>
                  <select 
                    required 
                    value={selectedProvinceId}
                    onChange={(e) => { setSelectedProvinceId(e.target.value); setSelectedDistrictId(""); }}
                    className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors bg-transparent cursor-pointer"
                  >
                    <option value="">Chọn Tỉnh/Thành</option>
                    {VIETNAM_LOCATIONS.map((p: Province) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Quận / Huyện</label>
                  <select 
                    required 
                    disabled={!selectedProvinceId}
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors bg-transparent cursor-pointer disabled:opacity-50"
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((d: District) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">Địa chỉ chi tiết</label>
                <input type="text" required value={addressDetail} onChange={(e) => setDetail(e.target.value)} placeholder="Số nhà, tên đường..." className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors" />
              </div>

              <div className="pt-8">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Phương thức thanh toán</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-4 p-4 border border-aura-gray-medium cursor-pointer rounded-xl hover:border-aura-black transition-colors">
                    <input type="radio" name="payment" value="cod" defaultChecked className="w-4 h-4 accent-aura-black" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Thanh toán khi nhận hàng (COD)</span>
                  </label>
                </div>
              </div>

              <button type="submit" disabled={isOrdering} className="w-full bg-aura-black text-white py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-aura-gray-dark transition-colors duration-300 rounded-xl disabled:opacity-50 mt-12">
                {isOrdering ? "Đang xử lý..." : "Hoàn tất đặt hàng"}
              </button>
            </form>
          </div>

          <div className="bg-aura-gray-light p-8 md:p-12 h-fit lg:sticky lg:top-28 rounded-[2rem]">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-12 border-b border-aura-gray-medium pb-4">Đơn hàng của bạn</h2>
            <div className="space-y-6 mb-12 max-h-[400px] overflow-y-auto pr-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-4">
                  <div className="w-16 aspect-[3/4] bg-white flex-shrink-0 rounded-lg overflow-hidden border border-aura-gray-medium">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1">{item.name}</h4>
                    <p className="text-[9px] uppercase tracking-widest text-aura-gray-dark">Size: {item.selectedSize} / {item.selectedColor} x {item.quantity}</p>
                    <p className="text-[10px] font-bold mt-1">{(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 border-t border-aura-gray-medium pt-8">
              <div className="flex justify-between items-end pt-4">
                <span className="text-xs font-bold uppercase tracking-widest">Tổng cộng</span>
                <span className="text-2xl font-bold">{totalPrice.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
