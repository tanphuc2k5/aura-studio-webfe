import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

interface User {
  name: string;
  email: string;
  phone?: string;
}

export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalPrice: number;
  status: "Processing" | "Shipped" | "Delivered";
  shippingAddress: {
    name: string;
    phone: string;
    province: string;
    district: string;
    detail: string;
  };
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addOrder: (order: Order) => void;
  updateUser: (updatedUser: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("aura-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedOrders = localStorage.getItem("aura-orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("aura-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("aura-user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("aura-orders", JSON.stringify(orders));
  }, [orders]);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser = { name: "Lê Tấn Phúc", email, phone: "0901234567" };
    setUser(mockUser);
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser = { name, email, phone: "" };
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem("aura-user");
    localStorage.removeItem("aura-orders");
    router.push("/");
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedUser });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        login,
        signup,
        logout,
        addOrder,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {isLoaded ? children : <div className="min-h-screen bg-aura-gray-light" />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
