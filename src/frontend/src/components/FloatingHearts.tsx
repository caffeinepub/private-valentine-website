import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 20 + Math.random() * 20,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float opacity-30"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <img
            src="/assets/generated/heart-icon-transparent.dim_64x64.png"
            alt=""
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
            }}
            className="drop-shadow-lg"
          />
        </div>
      ))}
    </div>
  );
}
