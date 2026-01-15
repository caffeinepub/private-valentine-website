import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useActor } from './hooks/useActor';
import { useCheckAccess } from './hooks/useQueries';
import PasswordScreen from './components/PasswordScreen';
import ValentineQuestion from './components/ValentineQuestion';
import FloatingHearts from './components/FloatingHearts';

export default function App() {
  const { isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: hasAccess, isLoading: checkingAccess, isFetched } = useCheckAccess();

  const isLoading = isInitializing || actorFetching || checkingAccess;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-red-100">
        <div className="text-rose-600 text-lg font-medium">Loading...</div>
      </div>
    );
  }

  // Show Valentine question when access is granted
  const showValentineQuestion = hasAccess === true;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-red-100">
      <FloatingHearts />
      
      <div className="relative z-10">
        {showValentineQuestion ? (
          <ValentineQuestion />
        ) : (
          <PasswordScreen />
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-20 py-4 text-center text-sm text-rose-600/70">
        <p>
          © 2025. Built with <span className="text-rose-500">♥</span> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-700 transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
