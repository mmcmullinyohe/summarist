import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("summarist-user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("summarist-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("summarist-user");
    }
  }, [user]);

  function openAuthModal() {
    setIsAuthModalOpen(true);
  }

  function closeAuthModal() {
    setIsAuthModalOpen(false);
  }

  function logout() {
    setUser(null);
    closeAuthModal();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}