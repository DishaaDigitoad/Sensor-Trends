import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/AuthContext";
import { auth, googleProvider } from "../../firebase-config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";

const Header = () => {
  const { user } = useAuth() || {}; // Add a default empty object in case useAuth() is undefined
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/"); // Navigate to home after logout
    } catch (error) {
      toast.error(`Error signing out: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await auth.signInWithPopup(googleProvider);
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Error signing in with Google: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="header">
      <header>
        <nav>
          <div className="logo">
            <h1>Logo</h1>
          </div>
          <ul className="nav-links">
            <li>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="user-profile">
              {user ? (
                <button onClick={handleLogout} disabled={loading}>
                  {loading ? "Logging out..." : "Log Out"}
                </button>
              ) : (
                <button onClick={handleSignUp} disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </button>
              )}
            </li>
          </ul>
        </nav>
        <ToastContainer />
      </header>
    </div>
  );
};

export default Header;
