import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type Role = "tourist" | "host";

interface AppState {
  role: Role | null;
  ready: boolean;
  setRole: (role: Role) => void;
  clearRole: () => void;
}

const AppStateContext = createContext<AppState | null>(null);

const ROLE_KEY = "role";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [role, setRoleState] = useState<Role | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(ROLE_KEY);
        if (stored === "tourist" || stored === "host") {
          setRoleState(stored);
        }
      } catch (err) {
        console.warn("Failed to load role from storage", err);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const setRole = async (r: Role) => {
    setRoleState(r);
    try {
      await AsyncStorage.setItem(ROLE_KEY, r);
    } catch (err) {
      console.warn("Failed to persist role", err);
    }
  };

  const clearRole = async () => {
    setRoleState(null);
    try {
      await AsyncStorage.removeItem(ROLE_KEY);
      router.replace("/");
    } catch (err) {
      console.warn("Failed to clear role", err);
    }
  };

  return (
    <AppStateContext.Provider value={{ role, ready, setRole, clearRole }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
