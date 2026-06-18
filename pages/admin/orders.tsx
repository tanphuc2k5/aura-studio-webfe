import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/AdminLayout";

const OrderManagement = () => {
  const orders = [
    { id: "ORD-7721", customer: "Nguyễn Văn A", total: "2,450,000đ", status: "Đang giao", date: "2026-06-18" },
    { id: "ORD-7720", customer: "Trần Thị B", total: "1,120,000đ", status: "Đã giao", date: "2026-06-17" },
    { id: "ORD-7719", customer: "Lê Văn C", total: "4,800,000đ", status: "Chờ duyệt", date: "2026-06-17" },
    { id: "ORD-7718", customer: "Phạm Minh D", total: "890,000đ", status: "Đã giao", date: "2026-06-16" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã giao": return "bg-green-100 text-green-600";
      case "Đang giao": return "bg-blue-100 text-blue-600";
      case "Chờ duyệt": return "bg-orange-100 text-orange-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Quản lý đơn hàng | Aura Admin</title>
      </Head>
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold uppercase tracking-luxury text-aura-black">Quản lý đơn hàng</h1>
          <p className="text-aura-gray-dark text-xs uppercase tracking-widest mt-2">Theo dõi và cập nhật trạng thái vận chuyển đơn hàng</p>
        </header>

        <div className="bg-white rounded-[2rem] border border-aura-gray-medium shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-aura-gray-light text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark border-b border-aura-gray-medium">
                <th className="px-8 py-4">Mã đơn</th>
                <th className="px-8 py-4">Khách hàng</th>
                <th className="px-8 py-4">Ngày đặt</th>
                <th className="px-8 py-4">Tổng tiền</th>
                <th className="px-8 py-4">Trạng thái</th>
                <th className="px-8 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-aura-gray-light hover:bg-aura-gray-light/50 transition-colors">
                  <td className="px-8 py-4 font-medium">{o.id}</td>
                  <td className="px-8 py-4 font-bold uppercase">{o.customer}</td>
                  <td className="px-8 py-4">{o.date}</td>
                  <td className="px-8 py-4">{o.total}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${getStatusColor(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right space-x-4">
                    <button className="text-blue-500 hover:underline font-bold uppercase">Chi tiết</button>
                    <button className="text-orange-500 hover:underline font-bold uppercase">Cập nhật</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderManagement;
