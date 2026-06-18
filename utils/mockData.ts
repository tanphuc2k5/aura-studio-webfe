export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: "Clothing" | "Shoes" | "Hats" | "Accessories";
  sizes: string[];
  colors: string[];
}

export const PRODUCTS: Product[] = [
  // --- CLOTHING (8) ---
  {
    id: "c1",
    name: "Aura Minimalist Shirt",
    price: 850000,
    description:
      "Áo sơ mi trắng tối giản với chất liệu cotton cao cấp, thoáng mát và đứng form.",
    images: ["/images/minimalist.jpg"],
    category: "Clothing",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Off-White"],
  },
  {
    id: "c2",
    name: "Classic Black Tee",
    price: 450000,
    description:
      "Áo thun đen basic không thể thiếu trong tủ đồ, mềm mại và bền bỉ.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Clothing",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
  },
  {
    id: "c3",
    name: "Premium Linen Trousers",
    price: 1250000,
    description:
      "Quần tây chất liệu linen sang trọng, phù hợp cho cả đi làm và đi chơi.",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Clothing",
    sizes: ["M", "L", "XL"],
    colors: ["Beige", "Sand"],
  },
  {
    id: "c4",
    name: "Oversized Wool Blazer",
    price: 2450000,
    description:
      "Áo Blazer dạ oversized tạo điểm nhấn sang trọng cho mọi set đồ.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Clothing",
    sizes: ["S", "M", "L"],
    colors: ["Charcoal", "Black"],
  },
  {
    id: "c5",
    name: "Relaxed Fit Jeans",
    price: 950000,
    description: "Quần jeans form rộng thoải mái, phong cách retro.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Clothing",
    sizes: ["28", "30", "32", "34"],
    colors: ["Light Blue", "Vintage Blue"],
  },
  {
    id: "c6",
    name: "Cotton Knit Sweater",
    price: 1150000,
    description: "Áo len dệt kim từ sợi cotton mềm mịn, ấm áp.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Clothing",
    sizes: ["S", "M", "L"],
    colors: ["Cream", "Gray"],
  },
  {
    id: "c7",
    name: "Silk Evening Dress",
    price: 3200000,
    description:
      "Váy lụa dạ hội với đường cắt xẻ tinh tế, tôn vinh nét quyến rũ.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Clothing",
    sizes: ["S", "M"],
    colors: ["Champagne", "Emerald"],
  },
  {
    id: "c8",
    name: "High-Waist Skirt",
    price: 750000,
    description: "Chân váy cạp cao phong cách công sở hiện đại.",
    images: ["/images/hightwaistskirt.jpeg"],
    category: "Clothing",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Grey"],
  },

  // --- SHOES (8) ---
  {
    id: "s1",
    name: "Aura Leather Loafers",
    price: 1850000,
    description: "Giày Loafers da thật cao cấp, êm ái cho cả ngày dài.",
    images: ["/images/auraleather.jpeg"],
    category: "Shoes",
    sizes: ["39", "40", "41", "42"],
    colors: ["Black", "Brown"],
  },
  {
    id: "s2",
    name: "Minimalist Sneakers",
    price: 1450000,
    description:
      "Giày sneaker trắng phong cách tối giản, dễ dàng phối hợp mọi trang phục.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Shoes",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    colors: ["White"],
  },
  {
    id: "s3",
    name: "Urban Boots",
    price: 2650000,
    description: "Giày Boots cổ lửng phong cách thành thị mạnh mẽ.",
    images: ["/images/urban.jpg"],
    category: "Shoes",
    sizes: ["40", "41", "42", "43"],
    colors: ["Black", "Tan"],
  },
  {
    id: "s4",
    name: "Linen Sandals",
    price: 650000,
    description: "Sandal quai mảnh nhẹ nhàng cho những chuyến đi biển.",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Shoes",
    sizes: ["35", "36", "37", "38"],
    colors: ["Beige"],
  },
  {
    id: "s5",
    name: "Modern Stilettos",
    price: 1950000,
    description: "Giày cao gót mũi nhọn sang trọng cho phái đẹp.",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Shoes",
    sizes: ["35", "36", "37", "38"],
    colors: ["Black", "Nude"],
  },
  {
    id: "s6",
    name: "Classic Chelsea Boots",
    price: 2850000,
    description: "Boot Chelsea da lộn phong cách Anh quốc.",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Shoes",
    sizes: ["39", "40", "41", "42"],
    colors: ["Navy", "Sand"],
  },
  {
    id: "s7",
    name: "Active Running Shoes",
    price: 1550000,
    description: "Giày chạy bộ chuyên dụng, trọng lượng siêu nhẹ.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Shoes",
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Red", "Blue"],
  },
  {
    id: "s8",
    name: "Slip-on Mules",
    price: 950000,
    description: "Giày sục hở gót tiện lợi, phong cách thời thượng.",
    images: ["/images/slip.jpg"],
    category: "Shoes",
    sizes: ["36", "37", "38", "39"],
    colors: ["Off-white", "Black"],
  },

  // --- HATS (8) ---
  {
    id: "h1",
    name: "Aura Signature Cap",
    price: 350000,
    description:
      "Mũ lưỡi trai thêu logo Aura Studio tinh tế, phong cách streetwear hiện đại.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Hats",
    sizes: ["One Size"],
    colors: ["Black", "Navy"],
  },
  {
    id: "h2",
    name: "Wool Fedora",
    price: 950000,
    description: "Mũ Fedora dạ len cao cấp cho phong cách lãng tử.",
    images: [
      "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Hats",
    sizes: ["One Size"],
    colors: ["Camel", "Black"],
  },
  {
    id: "h3",
    name: "Minimalist Beanie",
    price: 250000,
    description: "Mũ len ôm sát giữ ấm, thiết kế tối giản.",
    images: ["/images/beanie.jpg"],
    category: "Hats",
    sizes: ["One Size"],
    colors: ["Grey", "Cream"],
  },
  {
    id: "h4",
    name: "Summer Straw Hat",
    price: 550000,
    description: "Mũ cói rộng vành cho kỳ nghỉ hè rực rỡ.",
    images: ["/images/opi.jpg"],
    category: "Hats",
    sizes: ["One Size"],
    colors: ["Natural"],
  },
  {
    id: "h5",
    name: "Bucket Hat Canvas",
    price: 450000,
    description: "Mũ Bucket chất liệu canvas bền bỉ.",
    images: [
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Hats",
    sizes: ["One Size"],
    colors: ["Olive", "Black"],
  },
  {
    id: "h6",
    name: "Premium Beret",
    price: 650000,
    description: "Mũ nồi phong cách Pháp cổ điển và thanh lịch.",
    images: ["/images/beret.jpg"],
    category: "Hats",
    sizes: ["One Size"],
    colors: ["Black", "Red"],
  },
  {
    id: "h7",
    name: "Sun Visor",
    price: 320000,
    description: "Mũ nửa đầu phong cách thể thao khỏe khoắn.",
    images: [
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Hats",
    sizes: ["One Size"],
    colors: ["White", "Pink"],
  },
  {
    id: "h8",
    name: "Newsboy Cap",
    price: 580000,
    description: "Mũ Newsboy cổ điển, chất liệu dạ cao cấp.",
    images: [
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Hats",
    sizes: ["One Size"],
    colors: ["Brown", "Charcoal"],
  },

  // --- ACCESSORIES (8) ---
  {
    id: "a1",
    name: "Modern Leather Belt",
    price: 650000,
    description: "Thắt lưng da thật với khóa kim loại tối giản.",
    images: ["/images/belt.jpg"],
    category: "Accessories",
    sizes: ["M", "L"],
    colors: ["Black", "Brown"],
  },
  {
    id: "a2",
    name: "Minimalist Watch",
    price: 2250000,
    description: "Đồng hồ dây da với mặt số tinh giản, sang trọng.",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Silver/Black", "Rose Gold"],
  },
  {
    id: "a3",
    name: "Silk Scarf",
    price: 450000,
    description: "Khăn lụa mềm mại với họa tiết nghệ thuật.",
    images: [
      "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Pattern"],
  },
  {
    id: "a4",
    name: "Aura Tote Bag",
    price: 350000,
    description:
      "Túi vải tote chất liệu canvas dày dặn, thân thiện môi trường.",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Cream", "Black"],
  },
  {
    id: "a5",
    name: "Silver Necklace",
    price: 1250000,
    description: "Dây chuyền bạc 925 thiết kế hình học tối giản.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Silver"],
  },
  {
    id: "a6",
    name: "Leather Wallet",
    price: 950000,
    description: "Ví da thật nhỏ gọn, nhiều ngăn tiện lợi.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Black", "Navy"],
  },
  {
    id: "a7",
    name: "Sunglasses Aura",
    price: 1650000,
    description: "Kính mát chống tia UV cao cấp, gọng nhựa acetate.",
    images: ["/images/kinh1.jpg"],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Black", "Tortoise"],
  },
  {
    id: "a8",
    name: "Wool Scarf",
    price: 850000,
    description: "Khăn choàng len giữ ấm cho những ngày đông.",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Charcoal", "Burgundy"],
  },
];
