import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { Song, AppContextType } from "../types/Interface";
import Player from "../components/Player";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("token", "true");
    } else {
      localStorage.removeItem("token");
    }
  }, [isLoggedIn]);

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      currentSong,
      setCurrentSong,
    }),
    [isLoggedIn, currentSong]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
      {/* Render Player globally when a song is playing */}
      {isLoggedIn
        ? currentSong && (
            <Player
              currentSong={currentSong}
              onNext={() => {}}
              onPrevious={() => {}}
            />
          )
        : null}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
