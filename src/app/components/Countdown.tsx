'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft | null = null;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(timer);
  }, [targetDate]); // dependensi targetDate

  if (!timeLeft) {
    return <div className="text-2xl font-bold">Pesta sudah dimulai!</div>;
  }

  // Format helper
  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center justify-center bg-white/20 p-4 rounded-lg backdrop-blur-sm">
          <span className="text-4xl font-bold">{formatTime(value)}</span>
          <span className="text-sm uppercase">{unit}</span>
        </div>
      ))}
    </div>
  );
}