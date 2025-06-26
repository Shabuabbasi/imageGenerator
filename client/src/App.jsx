// App.jsx
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ ProtectedRoute to guard specific routes
const ProtectedRoute = ({ children }) => {
  const { token, setShowLogin } = useContext(AppContext);
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!token) {
      // ✅ Avoid calling setState during render
      setTimeout(() => {
        toast.info("Please login first");
        setShowLogin(true);
      }, 0);
    }
    setChecked(true); // Allow rendering after this effect
  }, [token, setShowLogin]);

  if (!checked) return null;
  if (!token) return <Navigate to="/" state={{ from: location }} replace />;

  return children;
};

function App() {
  const { showLogin, setShowLogin, setToken, setUser } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-pink-50">
      <ToastContainer />
      <Navbar />

      {/* ✅ Show Login Modal */}
      {showLogin && (
        <Login
          setToken={setToken}
          setUser={setUser}
          setShowLogin={setShowLogin}
        />
      )}

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buy"
          element={
            <ProtectedRoute>
              <BuyCredit />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
