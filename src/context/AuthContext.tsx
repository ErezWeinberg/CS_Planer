import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

function mapFirebaseError(code: string, err: unknown): string | null {
  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return null; // user closed — not an error
    case 'auth/popup-blocked':
      return 'הדפדפן חסם את החלון הקופץ. אפשר popups לאתר זה ונסה שנית.';
    case 'auth/unauthorized-domain':
      return 'הדומיין הנוכחי אינו מורשה. יש להוסיף אותו ב-Firebase Console.';
    case 'auth/network-request-failed':
      return 'בעיית תקשורת. בדוק את החיבור לאינטרנט ונסה שנית.';
    case 'auth/too-many-requests':
      return 'יותר מדי ניסיונות. המתן מספר דקות ונסה שנית.';
    case 'auth/user-disabled':
      return 'החשבון הזה מושבת. צור קשר עם מנהל המערכת.';
    case 'auth/invalid-api-key':
      return 'מפתח ה-API חסר או שגוי. יש להגדיר קובץ .env.local עם פרטי Firebase.';
    case 'auth/operation-not-allowed':
      return 'התחברות דרך גוגל אינה מופעלת בפרויקט ה-Firebase שלך (Sign-in provider disabled).';
    default: {
      console.error('Unhandled Firebase Auth Error:', code, err);
      const errMsg = (err as Error).message || String(err);
      return `שגיאה: ${code} - ${errMsg}`;
    }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function clearError() {
    setError(null);
  }

  async function signInWithGoogle() {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      const message = mapFirebaseError(code, err);
      if (message) setError(message);
    }
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, clearError, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
