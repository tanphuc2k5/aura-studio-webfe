import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/AdminLayout";

const UserManagement = () => {
  const users = [
    { id: 1, name: "tanphuc.it.205@gmail.com", role: "admin", status: "Hoạt động" },
    { id: 2, name: "customer1@gmail.com", role: "user", status: "Hoạt động" },
    { id: 3, name: "customer2@gmail.com", role: "user", status: "Bị khóa" },
    { id: 4, name: "customer3@gmail.com", role: "user", status: "Hoạt động" },
  ];

  return (
    <AdminLayout>
      <Head>
        <title>Quản lý thành viên | Aura Admin</title>
      </Head>
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold uppercase tracking-luxury text-aura-black">Quản lý thành viên</h1>
          <p className="text-aura-gray-dark text-xs uppercase tracking-widest mt-2">Kiểm soát quyền truy cập và thông tin người dùng</p>
        </header>

        <div className="bg-white rounded-[2rem] border border-aura-gray-medium shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-aura-gray-light text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark border-b border-aura-gray-medium">
                <th className="px-8 py-4">ID</th>
                <th className="px-8 py-4">Email / Tên đăng nhập</th>
                <th className="px-8 py-4">Vai trò</th>
                <th className="px-8 py-4">Trạng thái</th>
                <th className="px-8 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {users.map((u) => (
                <tr key={u.id} className="border-b border-aura-gray-light hover:bg-aura-gray-light/50 transition-colors">
                  <td className="px-8 py-4 font-medium">#{u.id}</td>
                  <td className="px-8 py-4 font-bold uppercase">{u.name}</td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${u.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-600"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`flex items-center gap-1 ${u.status === "Hoạt động" ? "text-green-500" : "text-red-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Hoạt động" ? "bg-green-500" : "bg-red-500"}`}></span>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right space-x-4">
                    <button className="text-blue-500 hover:underline font-bold uppercase">Sửa</button>
                    <button className="text-red-500 hover:underline font-bold uppercase">Khóa</button>
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

export default UserManagement;
