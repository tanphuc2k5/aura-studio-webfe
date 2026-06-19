import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS, Product } from "@/utils/mockData";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import QuickAddModal from "@/components/QuickAddModal";

const CATEGORIES = ["All", "Clothing", "Shoes", "Hats", "Accessories"];
const SIZES = ["S", "M", "L", "XL", "39", "40", "41", "42", "One Size"];
const PRODUCTS_PER_PAGE = 9;

export default function Shop() {
  const { addToCart } = useCart();
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { search, category } = router.query;
  
  // States cho bộ lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(4000000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  
  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);

  // Đồng bộ hóa với URL params
  useEffect(() => {
    if (search) setSearchTerm(search as string);
    if (category) setSelectedCategory(category as string);
  }, [search, category]);

  // Reset về trang 1 khi bộ lọc thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, maxPrice, selectedSizes, sortBy]);

  // Logic lọc và sắp xếp
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter((p) => p.price <= maxPrice);

    if (selectedSizes.length > 0) {
      result = result.filter((p) => 
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchTerm, selectedCategory, maxPrice, selectedSizes, sortBy]);

  // Tính toán sản phẩm cho trang hiện tại
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleQuickAdd = (product: Product) => {
    setQuickAddProduct(product);
  };

  const handleConfirmQuickAdd = (product: Product, size: string, color: string) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedSize: size,
      selectedColor: color,
      quantity: 1,
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`, {
      style: {
        borderRadius: '10px',
        background: '#111',
        color: '#fff',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setMaxPrice(4000000);
    setSelectedSizes([]);
    setSearchTerm("");
    router.push("/shop", undefined, { shallow: true });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Cửa hàng | Aura Studio</title>
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          <aside className="w-full md:w-64 flex-shrink-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8">Bộ lọc nâng cao</h2>
            
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase mb-4">Danh mục</h3>
              <div className="flex flex-col space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm text-left transition-colors ${
                      selectedCategory === cat ? "text-aura-black font-bold" : "text-aura-gray-dark hover:text-aura-black"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase mb-4">Khoảng giá</h3>
              <input
                type="range"
                min="0"
                max="4000000"
                step="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-aura-gray-medium appearance-none cursor-pointer accent-aura-black"
              />
              <div className="flex justify-between mt-2 text-xs text-aura-gray-dark">
                <span>0đ</span>
                <span className="font-bold text-aura-black">{maxPrice.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase mb-4">Kích thước</h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                    className={`min-w-[40px] h-10 border text-[10px] flex items-center justify-center transition-all ${
                      selectedSizes.includes(size)
                        ? "bg-aura-black text-white border-aura-black"
                        : "border-aura-gray-medium text-aura-black hover:border-aura-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="flex-grow">
            <div className="mb-8 relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-aura-gray-light border-none py-4 px-12 text-sm focus:ring-1 focus:ring-aura-black transition-all rounded-2xl"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-aura-gray-dark">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              {searchTerm && (
                <button onClick={clearAllFilters} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest font-bold text-aura-gray-dark">Xóa</button>
              )}
            </div>

            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-aura-gray-dark">Hiển thị <span className="text-aura-black font-medium">{filteredProducts.length}</span> sản phẩm</p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm font-medium focus:outline-none bg-transparent cursor-pointer">
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
              </select>
            </div>

            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
                  {currentProducts.map((product) => (
                    <div key={product.id} className="group">
                      <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-aura-gray-light rounded-2xl">
                        <Link href={`/shop/${product.id}`}>
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </Link>
                        <button onClick={() => handleQuickAdd(product)} className="absolute bottom-0 left-0 right-0 bg-aura-black text-white py-4 text-xs font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300">Thêm nhanh</button>
                      </div>
                      <Link href={`/shop/${product.id}`}><h3 className="text-sm font-medium mb-2 hover:underline">{product.name}</h3></Link>
                      <p className="text-sm text-aura-gray-dark">{product.price.toLocaleString("vi-VN")} VNĐ</p>
                    </div>
                  ))}
                </div>

                {/* Pagination UI */}
                {totalPages > 1 && (
                  <div className="mt-16 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-aura-gray-medium text-aura-gray-dark hover:border-aura-black hover:text-aura-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                            currentPage === page
                              ? "bg-blue-600 text-white border-transparent shadow-md"
                              : "border border-aura-gray-medium text-aura-gray-dark hover:border-aura-black hover:text-aura-black"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-aura-gray-medium text-aura-gray-dark hover:border-aura-black hover:text-aura-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-24 text-center bg-aura-gray-light rounded-[2rem] border-2 border-dashed border-aura-gray-medium">
                <p className="text-aura-gray-dark italic mb-6">Không tìm thấy sản phẩm phù hợp.</p>
                <button onClick={clearAllFilters} className="text-xs font-bold uppercase tracking-widest bg-aura-black text-white px-8 py-3 rounded-full">Xóa tất cả bộ lọc</button>
              </div>
            )}

          </section>
        </div>
      </main>

      <Footer />

      <QuickAddModal
        key={quickAddProduct?.id || "none"}
        product={quickAddProduct}
        onClose={() => setQuickAddProduct(null)}
        onAddToCart={handleConfirmQuickAdd}
      />
    </div>
  );
}
