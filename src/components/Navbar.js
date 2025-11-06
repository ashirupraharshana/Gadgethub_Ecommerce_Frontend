import React, { useState } from "react";
import { FiShoppingCart, FiMenu, FiX, FiGrid, FiPackage, FiSettings, FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", authMode, formData);
    closeAuthModal();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">
            <span className="logo-text">GadgetHub</span>
          </a>

          <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            <li>
              <a href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <FiGrid className="nav-icon" />
                <span>Categories</span>
              </a>
            </li>
            <li>
              <a href="/products" onClick={() => setIsMobileMenuOpen(false)}>
                <FiPackage className="nav-icon" />
                <span>Products</span>
              </a>
            </li>
            <li>
              <a href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <FiShoppingCart className="nav-icon" />
                <span>Cart</span>
              </a>
            </li>
            <li>
              <a href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <FiSettings className="nav-icon" />
                <span>Admin</span>
              </a>
            </li>
          </ul>

          <div className="auth-buttons">
            <button className="btn btn-login" onClick={() => openAuthModal("login")}>
              Login
            </button>
            <button className="btn btn-signup" onClick={() => openAuthModal("signup")}>
              Sign Up
            </button>
          </div>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {isAuthModalOpen && (
        <div className="modal-overlay" onClick={closeAuthModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeAuthModal}>
              <FiX />
            </button>

            <div className="modal-header">
              <h2>{authMode === "login" ? "Welcome Back" : "Create Account"}</h2>
              <p>{authMode === "login" ? "Login to your account" : "Sign up to get started"}</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {authMode === "signup" && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {authMode === "signup" && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <FiLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-submit">
                {authMode === "login" ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="auth-switch">
              {authMode === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button onClick={() => setAuthMode("signup")}>Sign Up</button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button onClick={() => setAuthMode("login")}>Login</button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          gap: 2rem;
        }

        .logo {
          text-decoration: none;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .logo-text {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.5px;
          transition: transform 0.3s ease;
        }

        .logo:hover .logo-text {
          transform: scale(1.05);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 0.5rem;
          align-items: center;
          flex: 1;
          justify-content: center;
        }

        .nav-links li a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          color: #ffffff;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .nav-links li a:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .nav-links li a:active {
          transform: translateY(0);
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .auth-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-shrink: 0;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .btn-login {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-login:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .btn-signup {
          background: #ffffff;
          color: #667eea;
        }

        .btn-signup:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 1.75rem;
          cursor: pointer;
          padding: 0.5rem;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .mobile-menu-toggle:hover {
          transform: scale(1.1);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: #ffffff;
          border-radius: 16px;
          padding: 2.5rem;
          max-width: 450px;
          width: 100%;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 50%;
        }

        .modal-close:hover {
          background: #f0f0f0;
          color: #333;
          transform: rotate(90deg);
        }

        .modal-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .modal-header h2 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .modal-header p {
          color: #666;
          font-size: 1rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: #999;
          font-size: 1.2rem;
        }

        .input-wrapper input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .toggle-password {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0.5rem;
          transition: color 0.3s ease;
        }

        .toggle-password:hover {
          color: #667eea;
        }

        .btn-submit {
          margin-top: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          padding: 1rem;
          font-size: 1.1rem;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .auth-switch {
          margin-top: 1.5rem;
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid #e0e0e0;
        }

        .auth-switch p {
          color: #666;
          font-size: 0.95rem;
        }

        .auth-switch button {
          background: none;
          border: none;
          color: #667eea;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .auth-switch button:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        @media screen and (max-width: 1024px) {
          .navbar-container {
            padding: 1rem 1.5rem;
          }

          .nav-links {
            gap: 0.25rem;
          }

          .nav-links li a {
            padding: 0.65rem 1rem;
            font-size: 0.95rem;
          }

          .auth-buttons {
            gap: 0.75rem;
          }

          .btn {
            padding: 0.65rem 1.25rem;
            font-size: 0.95rem;
          }
        }

        @media screen and (max-width: 900px) {
          .navbar-container {
            flex-wrap: wrap;
          }

          .mobile-menu-toggle {
            display: block;
            order: 3;
          }

          .auth-buttons {
            order: 2;
          }

          .nav-links {
            order: 4;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 1rem 0;
            gap: 0;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .nav-links li {
            width: 100%;
          }

          .nav-links li a {
            width: 100%;
            padding: 1rem 2rem;
            border-radius: 0;
            justify-content: flex-start;
          }

          .nav-links li a:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(5px);
          }
        }

        @media screen and (max-width: 480px) {
          .logo-text {
            font-size: 1.4rem;
          }

          .navbar-container {
            padding: 0.875rem 1rem;
          }

          .auth-buttons {
            gap: 0.5rem;
          }

          .btn {
            padding: 0.6rem 1rem;
            font-size: 0.875rem;
          }

          .modal-content {
            padding: 2rem 1.5rem;
            max-width: 95%;
          }

          .modal-header h2 {
            font-size: 1.6rem;
          }

          .modal-close {
            top: 1rem;
            right: 1rem;
          }
        }

        @media screen and (max-width: 360px) {
          .logo-text {
            font-size: 1.2rem;
          }

          .btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.8rem;
          }

          .modal-content {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;