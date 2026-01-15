import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConfettiAnimation from './ConfettiAnimation';

export default function ValentineQuestion() {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [noClickCount, setNoClickCount] = useState(0);

  const handleYes = () => {
    setAnswer('yes');
  };

  const handleNo = () => {
    setNoClickCount((prev) => prev + 1);
    if (noClickCount >= 2) {
      setAnswer('no');
    }
  };

  const getNoButtonText = () => {
    switch (noClickCount) {
      case 0:
        return 'No';
      case 1:
        return 'Are you sure?';
      case 2:
        return 'Really? 🥺';
      default:
        return 'No';
    }
  };

  if (answer === 'yes') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ConfettiAnimation />
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-rose-200 animate-in fade-in zoom-in duration-500">
          <CardHeader className="text-center space-y-6 pb-4">
            <div className="mx-auto relative">
              <div className="w-32 h-32 bg-gradient-to-br from-rose-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <Heart className="w-16 h-16 text-white fill-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 fill-yellow-400 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse delay-150" />
            </div>
            <CardTitle className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Yay! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 pb-8">
            <p className="text-2xl text-rose-700 font-semibold leading-relaxed">
              You've made me the happiest person! 💕
            </p>
            <p className="text-lg text-rose-600 leading-relaxed max-w-lg mx-auto">
              This Valentine's Day is going to be absolutely magical with you. 
              I can't wait to create beautiful memories together! ✨
            </p>
            <div className="flex justify-center gap-2 pt-4">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse delay-75" />
              <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse delay-150" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (answer === 'no') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-rose-200 animate-in fade-in zoom-in duration-500">
          <CardHeader className="text-center space-y-6 pb-4">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-6xl">🥺</span>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Oh no!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 pb-8">
            <p className="text-2xl text-rose-700 font-semibold leading-relaxed">
              That's okay... I understand! 💔
            </p>
            <p className="text-lg text-rose-600 leading-relaxed max-w-lg mx-auto">
              But hey, we can still be friends, right? Maybe next year? 
              Or maybe you'll change your mind... 😊
            </p>
            <p className="text-base text-rose-500 italic">
              (Psst... you can always refresh and try again if you change your mind! 😉)
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white"
            >
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-rose-200 animate-in fade-in zoom-in duration-700">
        <CardHeader className="text-center space-y-6 pb-4">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-rose-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <Heart className="w-16 h-16 text-white fill-white" />
          </div>
          <CardTitle className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight">
            Will You Be My Valentine?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-8 pb-8">
          <p className="text-xl text-rose-700 leading-relaxed max-w-md mx-auto">
            I've been thinking about this for a while, and I couldn't imagine 
            spending this special day with anyone else but you! 💕
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={handleYes}
              size="lg"
              className="w-full sm:w-auto px-12 py-6 text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Yes! 💖
            </Button>
            <Button
              onClick={handleNo}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-12 py-6 text-xl font-bold border-2 border-rose-300 text-rose-600 hover:bg-rose-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {getNoButtonText()}
            </Button>
          </div>
          {noClickCount > 0 && (
            <p className="text-sm text-rose-500 italic animate-in fade-in duration-300">
              Please? It would mean the world to me! 🥺
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
