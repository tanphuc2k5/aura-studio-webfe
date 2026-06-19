import React from 'react';
import { useRouter } from 'next/router';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mb-8">
          Cảm ơn bạn đã tin tưởng và mua sắm tại Aura Studio. Đơn hàng của bạn đang được hệ thống xử lý.
        </p>
        <button
          onClick={() => router.push('/')}
          className="w-full bg-black text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
