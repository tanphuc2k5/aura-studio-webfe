import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-aura-white border-t border-aura-gray-medium py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-luxury uppercase mb-6 block">
              Aura Studio
            </Link>
            <p className="text-aura-gray-dark text-sm max-w-xs leading-relaxed">
              Thời trang tối giản, hiện đại và sang trọng dành cho những ai yêu thích sự tinh tế.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Liên kết</h4>
            <ul className="space-y-4 text-sm text-aura-gray-dark">
              <li><Link href="/shop" className="hover:text-aura-black transition-colors">Cửa hàng</Link></li>
              <li><Link href="/about" className="hover:text-aura-black transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/contact" className="hover:text-aura-black transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Theo dõi</h4>
            <ul className="space-y-4 text-sm text-aura-gray-dark">
              <li><a href="#" className="hover:text-aura-black transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-aura-black transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-aura-black transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-aura-gray-medium pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-aura-gray-dark">
          <p>© 2026 Aura Studio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-aura-black transition-colors">Quyền riêng tư</Link>
            <Link href="/terms" className="hover:text-aura-black transition-colors">Điều khoản</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
