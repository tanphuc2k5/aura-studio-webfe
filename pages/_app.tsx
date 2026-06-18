import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" reverseOrder={false} />

          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
 