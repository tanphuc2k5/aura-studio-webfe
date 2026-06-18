import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  // Sync NextAuth session with internal user state
  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name || "Người dùng",
        email: session.user.email || "",
        phone: "",
      });
    } else {
      // Only clear if we are sure no other login method is active
      if (status === "unauthenticated") {
        setUser(null);
      }
    }
  }, [session, status]);

  // Persistence for Orders: Use localStorage as a mock DB since no real API is available
  useEffect(() => {
    const fetchOrders = async () => {
      // In a real app: const response = await fetch(`/api/orders?userId=${session?.user?.id}`);
      // const data = await response.json();
      // setOrders(data);
      
      const savedOrders = localStorage.getItem("aura-orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    };
    
    if (session) {
      fetchOrders();
    }
  }, [session]);

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
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
    setUser(null);
    setOrders([]);
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
      {status === "loading" ? (
        <div className="min-h-screen bg-aura-gray-light" />
      ) : (
        children
      )}
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
