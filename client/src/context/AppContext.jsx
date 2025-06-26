import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showLogin, setShowLogin] = useState(false);
  const [credit, setCredit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Backend URL (make sure .env has VITE_BACKEND_URL)
  const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(
    /\/$/,
    ""
  );

  // ✅ Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
    toast.info("Logged out successfully");
  }, []);

  // ✅ Load credits and user info
  const loadCreditsData = useCallback(async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/users/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.error("Failed to load credits:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        logout();
        setShowLogin(true); // ✅ Show login popup
      }
    }
  }, [token, backendUrl, logout]);

  // ✅ Image Generation API call
  const generateImage = useCallback(
    async (prompt) => {
      if (!token) {
        setShowLogin(true);
        return null;
      }

      setIsLoading(true);

      try {
        const { data } = await axios.post(
          `${backendUrl}/api/image/generate-image`,
          { prompt },
          {
            headers: {
              token: token,
            },
          }
        );

        if (data.success) {
          toast.success("Image generated successfully!");

          // ✅ Update credit in both global state and user object
          setCredit(data.creditBalance);
          setUser((prevUser) => ({
            ...prevUser,
            creditBalance: data.creditBalance,
          }));

          return data.resultImage;
        }

        toast.error(data.message);
        return null;
      } catch (error) {
        console.error("Image generation error:", error);

        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          logout();
          setShowLogin(true);
        } else if (error.response?.status === 402) {
          toast.error("Insufficient credits!");
        } else {
          toast.error("Image generation failed");
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [token, backendUrl, logout]
  );

  // ✅ Effect to load user info on app start or token change
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      loadCreditsData();
    } else {
      setCredit(0);
      setUser(null);
    }
  }, [token, loadCreditsData]);

  // ✅ Context value to provide
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    generateImage,
    logout,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ✅ Hook for easy context use
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};

export default AppContextProvider;
