'use client'; 

// 1. Impor 'useRef'
import { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation'; 
import GreetingCover from "./components/GreetingCover";

import { Playfair_Display, Lato } from 'next/font/google';

// --- Swiper & Lightbox Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from 'next/image';

// --- Impor Konfeti ---
import ReactConfetti from 'react-confetti';

// Inisialisasi font
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

// === DAFTAR FOTO (Tetap sama) ===
const slidesKenangan = [
  { src: '/images/foto1.jpg', width: 600, height: 800 },
  { src: '/images/foto2.jpg', width: 600, height: 800 },
  { src: '/images/foto4.jpg', width: 600, height: 800 },
  { src: '/images/foto5.jpg', width: 600, height: 800 },
  { src: '/images/foto6.jpg', width: 600, height: 800 },
  { src: '/images/foto7.jpg', width: 600, height: 800 },
];
const slidesAib = [
  { src: '/images/aib1.jpg', width: 800, height: 600 },
  { src: '/images/aib2.jpg', width: 600, height: 800 },
  { src: '/images/aib3.jpg', width: 800, height: 600 },
  { src: '/images/aib4.jpg', width: 800, height: 600 },
  { src: '/images/aib5.jpg', width: 600, height: 800 },
  { src: '/images/aib6.jpg', width: 800, height: 800 },
  { src: '/images/aib7.jpg', width: 800, height: 600 },
  { src: '/images/aib8.jpg', width: 600, height: 800 },
  { src: '/images/aib9.jpg', width: 800, height: 600 },
];

// === BACKGROUND UNTUK TIAP BAGIAN ===
const bgImages = {
  judul: "/images/judul.jpg",
  pesan: "/images/pesan.jpg",
  galeri: "/images/galeri.jpg",
  aib: "/images/aib.jpg", 
  penutup: "/images/penutup.jpg",
};


export default function HomePage() {
  const searchParams = useSearchParams();
  const partnerName = searchParams.get("to") || "Sayangku";
  
  const [lightboxKenangan, setLightboxKenangan] = useState(-1);
  const [lightboxAib, setLightboxAib] = useState(-1);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const launchConfetti = () => {
    // Kita masih perlu ukuran window agar konfeti memenuhi layar
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    setIsConfettiActive(true);
    setTimeout(() => {
      setIsConfettiActive(false);
    }, 10000); 
  };

  const handleOpenMusic = () => {
    audioRef.current?.play().catch(e => console.error("Autoplay diblokir:", e));
    setIsMusicPlaying(true);
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };


  return (
    <>
      {/* Player audio (tersembunyi, ada sejak awal) */}
      <audio ref={audioRef} src="/music/lagu.mp3" loop />
      
      {/* Tombol Mute/Unmute (hanya muncul setelah 'Buka' diklik) */}
      {isMusicPlaying && (
        <button
          onClick={toggleMusic}
          // z-50 agar di atas segalanya
          className="fixed bottom-6 right-6 z-50 bg-black/50 text-white p-3 rounded-full transition-transform hover:scale-110 shadow-lg"
          aria-label="Toggle Music"
        >
          {isMusicPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.5 3m0 0l4.5 3m-4.5-3v-3m0 3h-3.75m12.75 0V6.75A2.25 2.25 0 0 0 15 4.5h-3m-3 0a2.25 2.25 0 0 0-2.25 2.25v12A2.25 2.25 0 0 0 9 21h3a2.25 2.25 0 0 0 2.25-2.25v-1.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M6.75 8.25l4.5 3m0 0l4.5 3m-4.5-3v-3m0 3h-3.75m12.75 0V6.75A2.25 2.25 0 0 0 15 4.5h-3m-3 0a2.25 2.25 0 0 0-2.25 2.25v12A2.25 2.25 0 0 0 9 21h3a2.25 2.25 0 0 0 2.25-2.25v-1.5" />
            </svg>
          )}
        </button>
      )}

      {/* GreetingCover (z-40) */}
      <GreetingCover partnerName={partnerName} onOpen={handleOpenMusic}>
        
        {/* Konten <main> */}
        <main
          className={`relative overflow-hidden text-center text-white bg-black ${lato.className} isolation-isolate`}
        >
          {/* === PERBAIKAN: Animasi Bunga & Konfeti Full-Screen DIHAPUS dari sini === */}
          
          {/* === BAGIAN JUDUL === */}
          <section 
            className="relative min-h-screen w-full flex flex-col justify-center items-center space-y-12 p-8 bg-cover bg-center"
            style={{ 
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), 
                url(${bgImages.judul})
              ` 
            }}
          >
            <div className="relative z-10 animate-fadeIn">
              <h1 
                className={`text-5xl font-bold tracking-tight text-pink-300 ${playfair.className} [text-shadow:0px_2px_8px_rgba(0,0,0,0.8)]`}
              >
                Selamat Ulang Tahun,
              </h1>
              <h2 
                className={`text-6xl font-extrabold mt-4 ${playfair.className} [text-shadow:0px_2px_8px_rgba(0,0,0,0.8)]`}
              >
                {partnerName}!
              </h2>
            </div>
            <div className="relative z-10 w-32 h-1 bg-pink-300 rounded-full drop-shadow-md" />
          </section>

          {/* === BAGIAN PESAN === */}
          <section 
            // Tambahkan overflow-hidden agar konfeti tidak "bocor" keluar section
            className="relative min-h-screen w-full flex flex-col justify-center items-center p-8 bg-cover bg-center overflow-hidden"
            style={{ 
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), 
                url(${bgImages.pesan})
              ` 
            }}
          >
            {/* === PERBAIKAN: Konfeti dipindah ke sini === */}
            {isConfettiActive && (
              <ReactConfetti
                width={windowSize.width}  // Tetap pakai windowSize agar penuh
                height={windowSize.height} // Tetap pakai windowSize agar penuh
                // 'absolute' akan menempel di section ini
                className="absolute top-0 left-0 w-full h-full z-10" 
                recycle={true}
                numberOfPieces={500}
              />
            )}

            <div 
              // Kartu ini dinaikkan ke z-20 agar di atas konfeti (z-10)
              className="relative z-20 animate-fadeIn w-full max-w-2xl rounded-xl bg-black/30 p-8 shadow-2xl backdrop-blur-sm"
            >
              <h3 className={`text-3xl font-bold ${playfair.className}`}>Pesan Spesial Dariku</h3>
              <p className="mt-6 text-lg italic">
                "Hitungan tahun boleh bertambah, tapi rasanya aku baru aja jatuh cinta sama kamu kemarin. Terima kasih udah memilih untuk tumbuh dewasa bareng aku."
              </p>
              <p className={`mt-4 text-2xl font-bold ${playfair.className}`}>Selamat jadi makin tua! Aku akan selalu sayang kamu di setiap langkahnya.</p>
              <button
                onClick={launchConfetti}
                className="mt-8 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full text-base transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Klik Sini Buat Seru-seruan! 🎉
              </button>
            </div>
          </section>

          {/* === BAGIAN GALERI KENANGAN === */}
          <section 
            className="relative min-h-screen w-full flex flex-col justify-center items-center p-8 bg-cover bg-center"
            style={{ 
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), 
                url(${bgImages.galeri})
              ` 
            }}
          >
            <div className="relative z-10 animate-fadeIn w-full max-w-3xl">
              <h3 className={`text-3xl font-bold mb-8 ${playfair.className} [text-shadow:0px_2px_8px_rgba(0,0,0,0.8)]`}>
                Galeri Kenangan Kita
              </h3>
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                coverflowEffect={{
                  rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="w-full py-8"
              >
                {slidesKenangan.map((slide, index) => (
                  <SwiperSlide 
                    key={index} 
                    className="w-[280px] md:w-[320px] rounded-lg overflow-hidden shadow-2xl"
                    onClick={() => setLightboxKenangan(index)}
                  >
                    <Image
                      src={slide.src}
                      alt={`Kenangan ${index + 1}`}
                      width={slide.width}
                      height={slide.height}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* === BAGIAN GALERI AIB === */}
          <section 
            className="relative min-h-screen w-full flex flex-col justify-center items-center p-8 bg-cover bg-center"
            style={{ 
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), 
                url(${bgImages.aib})
              ` 
            }}
          >
            <div className="relative z-10 animate-fadeIn w-full max-w-3xl">
              <h3 className={`text-3xl font-bold mb-8 ${playfair.className} [text-shadow:0px_2px_8px_rgba(0,0,0,0.8)]`}>
                Dan... Sisi Lain Dirimu 🤫
              </h3>
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                coverflowEffect={{
                  rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="w-full py-8"
              >
                {slidesAib.map((slide, index) => (
                  <SwiperSlide 
                    key={index} 
                    className="w-[280px] md:w-[320px] rounded-lg overflow-hidden shadow-2xl"
                    onClick={() => setLightboxAib(index)}
                  >
                    <Image
                      src={slide.src}
                      alt={`Aib ${index + 1}`}
                      width={slide.width}
                      height={slide.height}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* === BAGIAN PENUTUP === */}
          <section 
            className="relative min-h-screen w-full flex justify-center items-center p-8 bg-cover bg-center"
            style={{ 
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), 
                url(${bgImages.penutup})
              ` 
            }}
          >
            <div 
              className="relative z-10 animate-fadeIn w-full max-w-2xl rounded-xl bg-black/30 p-8 shadow-2xl backdrop-blur-sm"
            >
              <p className="text-xl">
                "Nikmati harimu ya, Sayang. Kamu berhak mendapatkan semua cinta dan kebahagiaan di dunia. Terima kasih sudah menjadi kamu."
              </p>
              <p className={`mt-8 text-3xl font-bold ${playfair.className}`}>- Dengan segenap cinta, pacarmu yang paling keren.</p>
              <a
                // PENTING: Ganti dengan NOMOR WHATSAPP ANDA
                href="https://wa.me/62895361402448?text=Makasih%20ya%20buat%20ucapannya%21%20Aku%20mau%20bilang%20..."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block px-8 py-3 bg-green-500 text-white font-bold rounded-full text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Kirim Balasan via WhatsApp 💬
              </a>
            </div>
          </section>
        
        </main>

        {/* === LIGHTBOX UNTUK KENANGAN === */}
        <Lightbox
          open={lightboxKenangan >= 0}
          index={lightboxKenangan}
          close={() => setLightboxKenangan(-1)}
          slides={slidesKenangan}
        />

        {/* === LIGHTBOX UNTUK AIB === */}
        <Lightbox
          open={lightboxAib >= 0}
          index={lightboxAib}
          close={() => setLightboxAib(-1)}
          slides={slidesAib}
        />
        
      </GreetingCover>
    </>
  );
}