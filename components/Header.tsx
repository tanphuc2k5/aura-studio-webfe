import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { PRODUCTS, Product } from "@/utils/mockData";

const Header = () => {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Logic tìm kiếm Live Search
  useEffect(() => {
    if (searchValue.trim().length > 0) {
      const filtered = PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchValue.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchValue]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setShowSearchDropdown(false);
      setSearchValue("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-aura-white/80 backdrop-blur-md border-b border-aura-gray-medium">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[10px] font-bold uppercase tracking-widest">
          <Link href="/" className="hover:text-aura-gray-dark transition-colors">Trang chủ</Link>
          <Link href="/shop" className="hover:text-aura-gray-dark transition-colors">Sản phẩm</Link>
          <Link href="/about" className="hover:text-aura-gray-dark transition-colors">Giới thiệu</Link>
        </nav>

        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-luxury uppercase absolute left-1/2 -translate-x-1/2">
          Aura Studio
        </Link>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 md:space-x-6 ml-auto">
          {/* Search Input */}
          <div className="relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => searchValue.trim() && setShowSearchDropdown(true)}
                className="bg-aura-gray-light border-none py-2.5 pl-10 pr-4 text-[10px] uppercase tracking-widest focus:ring-1 focus:ring-aura-black transition-all w-40 lg:w-56 rounded-full"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-aura-gray-dark">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </form>

            {/* Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-3 w-80 bg-white border border-aura-gray-medium shadow-2xl rounded-2xl overflow-hidden py-2 animate-fade-in">
                <p className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-aura-gray-dark border-b border-aura-gray-light">Gợi ý sản phẩm</p>
                {searchResults.map((p) => (
                  <Link key={p.id} href={`/shop/${p.id}`} onClick={() => setShowSearchDropdown(false)} className="flex items-center space-x-4 px-4 py-3 hover:bg-aura-gray-light transition-colors group">
                    <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded-lg border border-aura-gray-medium group-hover:scale-105 transition-transform" />
                    <div className="flex-grow min-w-0">
                      <h4 className="text-[10px] font-bold uppercase tracking-wide truncate">{p.name}</h4>
                      <p className="text-[10px] text-aura-gray-dark">{p.price.toLocaleString("vi-VN")}đ</p>
                    </div>
                  </Link>
                ))}
                <button onClick={handleSearchSubmit} className="w-full text-center py-3 text-[9px] font-bold uppercase tracking-widest bg-aura-black text-white hover:bg-aura-gray-dark transition-colors">Xem tất cả kết quả</button>
              </div>
            )}
          </div>

          {/* User Auth / Profile */}
          {isAuthenticated ? (
            <div className="relative" ref={userRef}>
              <button 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest hover:text-aura-gray-dark transition-colors"
              >
                <span>Hi, {user?.name.split(' ').pop()}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3 h-3 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {showUserDropdown && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-aura-gray-medium shadow-2xl rounded-2xl overflow-hidden py-2 animate-fade-in">
                  <Link href="/profile?tab=account" onClick={() => setShowUserDropdown(false)} className="block px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-aura-gray-light transition-colors">Tài khoản của tôi</Link>
                  <Link href="/profile?tab=orders" onClick={() => setShowUserDropdown(false)} className="block px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-aura-gray-light transition-colors border-b border-aura-gray-light">Đơn mua</Link>
                  <button onClick={() => { logout(); setShowUserDropdown(false); }} className="w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors">Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/signin" className="hidden md:block text-[10px] font-bold uppercase tracking-widest hover:text-aura-gray-dark transition-colors">Đăng nhập</Link>
          )}

          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-aura-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
