import { useState, useEffect } from 'react';
import { Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useValidatePassword } from '../hooks/useQueries';
import PersonalizedGreeting from './PersonalizedGreeting';

export default function PasswordScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [recipientName, setRecipientName] = useState<string | undefined>(undefined);
  const validatePassword = useValidatePassword();

  // Extract 'to' parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam) {
      setRecipientName(toParam.trim());
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    try {
      const isValid = await validatePassword.mutateAsync(password);
      
      if (!isValid) {
        setError('Incorrect password. Try again! 💕');
        setPassword('');
      } else {
        // Clear error on success
        setError('');
      }
    } catch (err) {
      console.error('Password validation error:', err);
      setError('Something went wrong. Please try again.');
      setPassword('');
    }
  };

  // Clear error when user starts typing
  useEffect(() => {
    if (password && error) {
      setError('');
    }
  }, [password, error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <PersonalizedGreeting name={recipientName} />
      
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-rose-200">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            A Special Message
          </CardTitle>
          <CardDescription className="text-base text-rose-700">
            Enter the secret password to unlock something special
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                  disabled={validatePassword.isPending}
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-sm text-rose-600 font-medium animate-in fade-in duration-200">
                  {error}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold shadow-lg"
              disabled={validatePassword.isPending}
            >
              {validatePassword.isPending ? 'Unlocking...' : 'Unlock'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
