import { Heart } from 'lucide-react';

interface PersonalizedGreetingProps {
  name?: string;
}

export default function PersonalizedGreeting({ name }: PersonalizedGreetingProps) {
  if (!name) return null;

  return (
    <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-1000">
      <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full shadow-xl border-2 border-rose-200">
        <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
          A special Valentine just for {name}
        </h1>
        <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
      </div>
    </div>
  );
}
