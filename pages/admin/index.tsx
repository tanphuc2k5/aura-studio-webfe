import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Tổng quan | Aura Admin</title>
      </Head>

      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold uppercase tracking-luxury text-aura-black">
            Tổng quan hệ thống
          </h1>
          <p className="text-aura-gray-dark text-xs uppercase tracking-widest mt-2">
            Theo dõi hiệu suất kinh doanh của Aura Studio
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            label="Doanh thu tháng"
            value="128.450.000đ"
            trend="+12.5%"
            trendUp={true}
            icon="💰"
          />
          <StatCard
            label="Tổng đơn hàng"
            value="1,204"
            trend="+8.2%"
            trendUp={true}
            icon="📦"
          />
          <StatCard
            label="Tổng sản phẩm"
            value="156"
            trend="Ổn định"
            trendUp={null}
            icon="✨"
          />
          <StatCard
            label="Tổng thành viên"
            value="3,412"
            trend="+4.1%"
            trendUp={true}
            icon="👥"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-aura-gray-medium shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6">
              Đơn hàng mới nhất
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark border-b border-aura-gray-light">
                    <th className="pb-4">Mã đơn</th>
                    <th className="pb-4">Khách hàng</th>
                    <th className="pb-4">Giá trị</th>
                    <th className="pb-4">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <TableRow
                    id="#ORD-7721"
                    name="Nguyễn Văn A"
                    price="2,450,000đ"
                    status="Đang giao"
                    statusColor="text-blue-500"
                  />
                  <TableRow
                    id="#ORD-7720"
                    name="Trần Thị B"
                    price="1,120,000đ"
                    status="Đã giao"
                    statusColor="text-green-500"
                  />
                  <TableRow
                    id="#ORD-7719"
                    name="Lê Văn C"
                    price="4,800,000đ"
                    status="Chờ duyệt"
                    statusColor="text-orange-500"
                  />
                  <TableRow
                    id="#ORD-7718"
                    name="Phạm Minh D"
                    price="890,000đ"
                    status="Đã giao"
                    statusColor="text-green-500"
                  />
                </tbody>
              </table>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white p-8 rounded-[2rem] border border-aura-gray-medium shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6">
              Trạng thái hệ thống
            </h2>
            <div className="space-y-6">
              <SystemItem
                label="Server API"
                status="Hoạt động"
                color="bg-green-500"
              />
              <SystemItem
                label="Database"
                status="Hoạt động"
                color="bg-green-500"
              />
              <SystemItem
                label="Payment Gateway"
                status="Bảo trì"
                color="bg-orange-500"
              />
              <SystemItem
                label="Storage"
                status="Hoạt động"
                color="bg-green-500"
              />
            </div>
            <div className="mt-10 p-4 bg-aura-gray-light rounded-xl">
              <p className="text-[10px] text-aura-gray-dark italic leading-relaxed">
                Lưu ý: Hệ thống tự động sao lưu dữ liệu vào 02:00 AM mỗi ngày.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean | null;
  icon: string;
}

const StatCard = ({ label, value, trend, trendUp, icon }: StatCardProps) => (
  <div className="bg-white p-6 rounded-[2rem] border border-aura-gray-medium shadow-sm transition-transform hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-4">
      <span className="text-2xl">{icon}</span>
      <span
        className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full ${trendUp === true ? "bg-green-100 text-green-600" : trendUp === false ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}
      >
        {trend}
      </span>
    </div>
    <p className="text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-1">
      {label}
    </p>
    <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
  </div>
);

interface TableRowProps {
  id: string;
  name: string;
  price: string;
  status: string;
  statusColor: string;
}

const TableRow = ({ id, name, price, status, statusColor }: TableRowProps) => (
  <tr className="border-b border-aura-gray-light hover:bg-aura-gray-light/50 transition-colors">
    <td className="py-4 font-medium">{id}</td>
    <td className="py-4">{name}</td>
    <td className="py-4">{price}</td>
    <td className={`py-4 font-bold uppercase text-[10px] ${statusColor}`}>
      {status}
    </td>
  </tr>
);

interface SystemItemProps {
  label: string;
  status: string;
  color: string;
}

const SystemItem = ({ label, status, color }: SystemItemProps) => (
  <div className="flex items-center justify-between py-2 border-b border-aura-gray-light last:border-0">
    <span className="text-xs font-medium text-aura-gray-dark">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`}></span>
      <span className="text-[10px] font-bold uppercase">{status}</span>
    </div>
  </div>
);

export default AdminDashboard;
