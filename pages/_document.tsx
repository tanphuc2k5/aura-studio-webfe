import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        {/* Nhúng Font Inter từ Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Aura Studio - Thời trang tối giản, hiện đại và sang trọng." />
      </Head>
      <body className="antialiased bg-aura-gray-light text-aura-black font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
