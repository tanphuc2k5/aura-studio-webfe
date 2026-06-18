import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/AdminLayout";

const ProductManagement = () => {
  const products = [
    { id: 1, name: "Aura Silk Dress", price: "4,500,000đ", stock: 12, category: "Dress" },
    { id: 2, name: "Velvet Evening Gown", price: "8,200,000đ", stock: 5, category: "Evening" },
    { id: 3, name: "Satin Bridal Set", price: "15,000,000đ", stock: 2, category: "Bridal" },
    { id: 4, name: "Linen Summer Shirt", price: "1,200,000đ", stock: 45, category: "Casual" },
  ];

  return (
    <AdminLayout>
      <Head>
        <title>Quản lý sản phẩm | Aura Admin</title>
      </Head>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-luxury text-aura-black">Quản lý sản phẩm</h1>
            <p className="text-aura-gray-dark text-xs uppercase tracking-widest mt-2">Cập nhật thông tin và kho hàng sản phẩm</p>
          </div>
          <button className="bg-aura-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-aura-gray-dark transition-all rounded-full shadow-lg">
            + Thêm sản phẩm mới
          </button>
        </header>

        <div className="bg-white rounded-[2rem] border border-aura-gray-medium shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-aura-gray-light text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark border-b border-aura-gray-medium">
                <th className="px-8 py-4">ID</th>
                <th className="px-8 py-4">Tên sản phẩm</th>
                <th className="px-8 py-4">Danh mục</th>
                <th className="px-8 py-4">Giá bán</th>
                <th className="px-8 py-4">Kho</th>
                <th className="px-8 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {products.map((p) => (
                <tr key={p.id} className="border-b border-aura-gray-light hover:bg-aura-gray-light/50 transition-colors">
                  <td className="px-8 py-4 font-medium">#{p.id}</td>
                  <td className="px-8 py-4 font-bold uppercase">{p.name}</td>
                  <td className="px-8 py-4">{p.category}</td>
                  <td className="px-8 py-4">{p.price}</td>
                  <td className="px-8 py-4">{p.stock}</td>
                  <td className="px-8 py-4 text-right space-x-4">
                    <button className="text-blue-500 hover:underline font-bold uppercase">Sửa</button>
                    <button className="text-red-500 hover:underline font-bold uppercase">Xóa</button>
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

export default ProductManagement;
