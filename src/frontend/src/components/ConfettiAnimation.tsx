import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
}

export default function ConfettiAnimation() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const pieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      rotation: Math.random() * 360,
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute -top-20 animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          <img
            src="/assets/generated/confetti-hearts-transparent.dim_200x200.png"
            alt=""
            className="w-8 h-8 drop-shadow-lg"
            style={{
              transform: `rotate(${piece.rotation}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
