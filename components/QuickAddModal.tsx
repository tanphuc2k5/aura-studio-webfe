import React, { useState, useEffect } from "react";
import { Product } from "@/utils/mockData";
import toast from "react-hot-toast";

interface QuickAddModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!product) return null;

  const handleConfirm = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Vui lòng chọn đầy đủ Kích cỡ và Màu sắc trước khi thêm vào giỏ hàng!", {
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

    onAddToCart(product, selectedSize, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-aura-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative border border-aura-gray-medium max-h-[90vh] flex flex-col z-10 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-aura-gray-medium">
          <h2 className="text-xs font-bold uppercase tracking-widest text-aura-black">
            Lựa chọn phân loại
          </h2>
          <button 
            onClick={onClose}
            className="text-aura-gray-dark hover:text-aura-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Product Info Summary */}
          <div className="flex space-x-4 pb-6 border-b border-aura-gray-medium">
            <div className="w-20 aspect-[3/4] bg-aura-gray-light rounded-xl overflow-hidden flex-shrink-0">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-sm font-medium text-aura-black mb-1">{product.name}</h3>
              <p className="text-sm font-bold text-aura-black">
                {product.price.toLocaleString("vi-VN")} VNĐ
              </p>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-aura-black">Kích cỡ</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[50px] h-10 border text-xs flex items-center justify-center transition-all rounded-lg ${
                    selectedSize === size
                      ? "bg-aura-black text-white border-aura-black"
                      : "border-aura-gray-medium text-aura-black hover:border-aura-black bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-aura-black">Màu sắc</h4>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="flex items-center space-x-2 transition-all focus:outline-none"
                  >
                    <div
                      className={`w-6 h-6 rounded-full border border-aura-gray-medium flex items-center justify-center ${
                        isSelected ? "ring-2 ring-aura-black ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: color.toLowerCase().replace(" ", "") }}
                    />
                    <span className={`text-[10px] uppercase tracking-widest ${
                      isSelected ? "font-bold text-aura-black" : "text-aura-gray-dark"
                    }`}>
                      {color}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-aura-gray-medium bg-aura-gray-light">
          <button
            onClick={handleConfirm}
            className="w-full bg-aura-black text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
          >
            Xác nhận thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
