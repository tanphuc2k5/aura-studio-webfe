import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Giả lập gửi form
    setTimeout(() => {
      toast.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Liên hệ | Aura Studio</title>
        <meta
          name="description"
          content="Liên hệ với Aura Studio để được tư vấn và hỗ trợ tốt nhất."
        />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.3em] mb-4">
              Liên hệ
            </h1>
            <div className="w-24 h-1 bg-aura-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Khối bên trái: Thông tin & Form */}
            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-aura-gray-medium pb-4">
                  Thông tin liên hệ
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-aura-black mt-1" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1">
                        Địa chỉ
                      </p>
                      <p className="text-sm text-aura-gray-dark">
                        203 Phạm Văn Đồng, Phường 1, Gò Vấp, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-aura-black mt-1" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1">
                        Điện thoại
                      </p>
                      <p className="text-sm text-aura-gray-dark">
                        090 1234 567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-aura-black mt-1" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1">
                        Email
                      </p>
                      <p className="text-sm text-aura-gray-dark">
                        contact@aurastudio.vn
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-aura-gray-medium pb-4">
                  Gửi tin nhắn cho chúng tôi
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors bg-transparent"
                      placeholder="Nhập đầy đủ họ tên của bạn<3"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors bg-transparent"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-gray-dark mb-2">
                      Nội dung lời nhắn
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full border-b border-aura-gray-medium py-3 text-sm focus:outline-none focus:border-aura-black transition-colors bg-transparent resize-none"
                      placeholder="Hãy để lại tin nhắn của bạn..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center space-x-2 bg-aura-black text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-aura-gray-dark transition-all duration-300 rounded-full disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}</span>
                    {!isSubmitting && <Send className="w-4 h-4" />}
                  </button>
                </form>
              </section>
            </div>

            {/* Khối bên phải: Bản đồ */}
            <div className="w-full h-full min-h-[450px]">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-aura-gray-medium pb-4 lg:hidden">
                Bản đồ
              </h2>
              <div className="relative w-full h-[450px] lg:h-[600px] overflow-hidden rounded-2xl border border-aura-gray-medium shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1127715848527!2d106.68962017573614!3d10.821893858708945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f110cf972d%3A0xc3f0b2f9cdbcf6cd!2zMjAzIFBo4bqhb  V_hu5_T_EgR_hu5_T_bmcsIFBoxrDhu51uZyAxLCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7hHQgTmFt!5e0!3m2!1svi!2s!4v1718671234567!5m2!1svi!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
