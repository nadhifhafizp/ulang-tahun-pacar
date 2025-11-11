'use client';

import { useState } from 'react';
import { Playfair_Display, Lato } from 'next/font/google'; 

// Inisialisasi font
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

// 1. Tambahkan 'onOpen' ke interface props
interface GreetingCoverProps {
  partnerName: string;
  children: React.ReactNode;
  onOpen: () => void; // <-- TAMBAHAN UNTUK MUSIK
}

// 2. Tambahkan 'onOpen' ke parameter fungsi
export default function GreetingCover({ partnerName, children, onOpen }: GreetingCoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Bagian Halaman Sampul (Cover)
  if (!isOpen) {
    return (
      <div
        // z-index diatur ke z-40
        // Ini akan ada di atas Bunga Jatuh (z-30) tapi di bawah Konfeti (z-50)
        className="fixed inset-0 z-40 flex h-screen w-screen items-center justify-center bg-cover bg-center p-8 text-white"
        style={{ backgroundImage: "url('/images/judul.jpg')" }} // Ganti dengan gambar cover Anda
      >
        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Konten Sampul (Layout Baru) */}
        <div 
          className={`relative z-10 flex flex-col items-center space-y-8 text-center animate-fadeIn ${playfair.className}`}
        >
          
          <div className="[text-shadow:0px_2px_8px_rgba(0,0,0,0.7)]">
            <p className={`text-2xl font-light text-pink-300 ${lato.className}`}>
              Selamat Ulang Tahun,
            </p>
            <h1 className="text-6xl md:text-7xl font-bold mt-2">
              {partnerName}
            </h1>
            <p className={`text-lg mt-4 italic ${lato.className}`}>
              Kamu punya pesan spesial di dalam...
            </p>
          </div>

          <div className="w-32 h-1 bg-pink-300 rounded-full" />

          {/* 3. Perbarui 'onClick' untuk memanggil 'onOpen' */}
          <button
            onClick={() => {
              setIsOpen(true); // Buka halaman
              onOpen();       // Panggil fungsi (mainkan musik)
            }}
            className="px-8 py-3 bg-pink-500 text-white font-bold rounded-full text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg animate-pulse"
          >
            Buka Hadiah 🎁
          </button>
        </div>
        
      </div>
    );
  }

  // Jika sudah dibuka, tampilkan konten utama
  return <>{children}</>;
}