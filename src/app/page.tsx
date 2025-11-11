import { Suspense } from 'react';
import BirthdayPage from './BirthdayPage'; // Memanggil file yang baru kita buat

// Ini adalah komponen loading sederhana sebagai fallback
// Sambil menunggu halaman BirthdayPage siap
function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black p-8 text-white">
      <div className="text-center text-xl">
        Memuat ucapan spesial...
      </div>
    </div>
  );
}

export default function Page() {
  return (
    // Inilah <Suspense> yang diminta oleh Vercel
    <Suspense fallback={<LoadingFallback />}>
      <BirthdayPage />
    </Suspense>
  );
}