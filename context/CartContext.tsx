import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Định nghĩa cấu trúc Item trong giỏ hàng
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

// 2. Định nghĩa các hàm và trạng thái mà Context cung cấp
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number, size: string, color: string) => void;
  updateQuantity: (id: string | number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Khôi phục giỏ hàng từ localStorage khi mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("aura-cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart from localStorage", error);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Lưu giỏ hàng vào localStorage khi có thay đổi (chỉ sau khi đã khởi tạo)
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("aura-cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // Thêm sản phẩm vào giỏ
  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Tìm xem sản phẩm đã tồn tại với cùng ID, Size và Màu chưa
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.selectedSize === newItem.selectedSize &&
          item.selectedColor === newItem.selectedColor
      );

      if (existingItemIndex > -1) {
        // Nếu tồn tại, tăng số lượng
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      }

      // Nếu chưa có, thêm dòng mới
      return [...prevCart, newItem];
    });
  };

  // Xóa sản phẩm khỏi giỏ (dựa trên bộ 3 định danh: ID, Size, Color)
  const removeFromCart = (id: string | number, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id: string | number, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => setCart([]);

  // Tính toán tổng số lượng và tổng tiền
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng Cart Context nhanh hơn
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
