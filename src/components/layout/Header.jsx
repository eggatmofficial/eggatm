import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch, FaTimes, FaSignOutAlt, FaSignInAlt, FaStore } from "react-icons/fa";
import logoImage from "../../assets/imges/Logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth.store";
import { clearCart } from "../../store/cart.store";
import useDebounce from "../../hooks/useDebounce";




const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { totalQuantity } = useSelector((state) => state.cart);
  const { isAuthenticated, user,loading } = useSelector((state) => state.auth);
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);

  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    if (!searchOpen) return;

    if (debouncedSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(debouncedSearch)}`);
    } else {
      navigate("/products");
    }
  }, [debouncedSearch, searchOpen, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 50) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
    setShowUserMenu(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">

            {/* LEFT: Hamburger + Title (Mobile) */}
            <div className="left-group">
              <button
                className={`menu-btn ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span />
                <span />
                <span />
              </button>

              <Link to="/" className="brand-title">
                EGG<span>!</span>ATM
              </Link>
            </div>

            {/* LOGO (Desktop only) */}
            <Link to="/" className="logo">
              <img src={logoImage} alt="Logo" className="logo-img" />
            </Link>

            {/* MENU */}
            <div className={`nav-links ${menuOpen ? "active" : ""}`}>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              
              {isAuthenticated && (
                <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
              )}
              
              <Link to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
              <Link to="/franchise" onClick={()=> setMenuOpen(false)}>Franchise</Link>
              {isAuthenticated && user?.role === 'franchise' && (
                <Link to="/franchise-dashboard" onClick={() => setMenuOpen(false)} className="franchise-nav">
                  <FaStore className="icon-small" /> Dashboard
                </Link>
              )}
            </div>

            {/* ACTIONS */}
            <div className="actions-container">
              {/* Search */}
              {/* <form className="search-form">
                {searchOpen && (
                  <input
                    ref={searchInputRef}
                    className="search-input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                )}

                <button
                  type="button"
                  className="search-btn"
                  onClick={() => {
                    if (!searchOpen) {
                      setSearchOpen(true);
                    } else {
                      setSearchOpen(false);
                      setSearchQuery("");
                      navigate("/products");
                    }
                  }}
                >
                  {searchOpen ? <FaTimes /> : <FaSearch />}
                </button>
              </form> */}

              {/* Vertical Separator Line */}
              {/* <div className="separator-line"></div> */}

              {/* Franchise Button */}
              {/* <button className="franchise-header-btn">Franchise</button> */}
            {/* <button
                className="franchise-header-btn"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/franchise.pdf";
                  link.download = "Franchise_Details.pdf";
                  link.click();
                }}
              >
                Franchise
              </button> */}


              {/* Vertical Separator Line */}
              {/* <div className="separator-line"></div> */}

              {/* User Menu Dropdown */}
              <div className="user-menu-container" ref={userMenuRef}>
                <button 
                  className="user-menu-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="user-avatar">
                    <FaUser />
                  </div>
                  <span className="user-text">
                    {isAuthenticated ? user?.name?.split(' ')[0] || 'Account' : 'Login'}
                  </span>
                  <span className="dropdown-arrow">▼</span>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    {isAuthenticated ? (
                      <>
                        <div className="user-info">
                          <div className="user-name">{user?.name}</div>
                          <div className="user-email">{user?.email}</div>
                          {user?.role === 'franchise' && (
                            <div className="user-role">
                              <FaStore className="role-icon" /> Franchise Partner
                            </div>
                          )}
                        </div>
                        
                        <div className="dropdown-divider" />
                        
                        <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <FaUser className="dropdown-icon" /> My Profile
                        </Link>
                        
                        {/* {isAuthenticated && (
                          <Link to="/products" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                            <FaStore className="dropdown-icon" /> Products
                          </Link>
                        )}
                        
                        {user?.role === 'franchise' && (
                          <Link to="/franchise-dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                            <FaStore className="dropdown-icon" /> Franchise Dashboard
                          </Link>
                        )} */}
                        
                        <button className="dropdown-item logout-btn" onClick={handleLogout}>
                          <FaSignOutAlt className="dropdown-icon" /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="dropdown-item" style={{ color: '#666', cursor: 'default' }} onClick={handleLogin}>
                          <FaStore className="dropdown-icon" /> 
                          <span>Login to access Products</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Vertical Separator Line */}
               {isAuthenticated && (
              <div className="separator-line"></div>
               )}
               
              {/* Cart - Only show if user is authenticated */}
              {isAuthenticated && (
                <Link to="/cart" className="icon-btn cart">
                  <FaShoppingCart />
                  {totalQuantity > 0 && (
                    <span className="cart-count">{totalQuantity}</span>
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* STYLES - Updated with separator lines */}
      <style>{`
        .header {
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 1000;
          box-shadow: 0 2px 12px rgba(0,0,0,.08);
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 70px;
        }

        /* LEFT GROUP */
        .left-group {
          display: none;
          align-items: center;
          gap: 12px;
        }

        .brand-title {
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #111;
          text-decoration: none;
        }

        .brand-title span {
          color: #faa807;
        }

        /* LOGO */
        .logo-img {
          height: 55px;
        }

        /* NAV LINKS */
        .nav-links {
          display: flex;
          gap: 25px;
        }

        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 600;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #faa807;
        }

        .franchise-nav {
          color: #faa807 !important;
          font-weight: 600 !important;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .icon-small {
          font-size: 0.9em;
        }

        /* ACTIONS */
        .actions-container {
          display: flex;
          gap: 0; /* Changed from 20px to 0 */
          align-items: center;
          height: 100%;
        }

        /* VERTICAL SEPARATOR LINE */
        .separator-line {
          width: 1px;
          height: 30px;
          background-color: #e0e0e0;
          margin: 0 15px; /* Space around the line */
        }

        /* Search */
        .search-form {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-input {
          border: 1px solid #ddd;
          padding: 8px 15px;
          border-radius: 25px;
          width: 200px;
          transition: all 0.3s;
          outline: none;
        }

        .search-input:focus {
          border-color: #faa807;
          box-shadow: 0 0 0 2px rgba(250, 168, 7, 0.1);
        }

        .search-btn {
          background: linear-gradient(135deg, #faa807, #ffd13d);
          color: #fff;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .search-btn:hover {
          transform: scale(1.1);
        }

        /* Franchise Button */
        .franchise-header-btn {
          padding: 8px 16px;
          border: 2px solid #faa807;
          border-radius: 8px;
          background: transparent;
          color: #faa807;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
          margin: 0 5px;
        }

        .franchise-header-btn:hover {
          background: #faa807;
          color: white;
        }

        /* User Menu */
        .user-menu-container {
          position: relative;
          margin: 0 5px;
        }

        .user-menu-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: 1px solid #e0e0e0;
          border-radius: 25px;
          padding: 8px 15px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .user-menu-btn:hover {
          border-color: #faa807;
          background: rgba(250, 168, 7, 0.05);
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #faa807, #ffd13d);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .user-text {
          font-weight: 500;
          color: #333;
        }

        .dropdown-arrow {
          font-size: 0.8em;
          color: #666;
        }

        .user-dropdown {
          position: absolute;
          top: 120%;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          width: 280px;
          z-index: 1000;
          overflow: hidden;
        }

        .user-info {
          padding: 20px;
          background: linear-gradient(135deg, #faa807, #ffd13d);
          color: white;
        }

        .user-name {
          font-weight: 600;
          font-size: 1.1em;
        }

        .user-email {
          font-size: 0.9em;
          opacity: 0.9;
          margin-top: 4px;
        }

        .user-role {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85em;
          margin-top: 8px;
          background: rgba(255,255,255,0.2);
          padding: 4px 10px;
          border-radius: 15px;
          width: fit-content;
        }

        .role-icon {
          font-size: 0.9em;
        }

        .dropdown-divider {
          height: 1px;
          background: #f0f0f0;
          margin: 5px 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 20px;
          text-decoration: none;
          color: #333;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s;
        }

        .dropdown-item:hover {
          background: #f8f8f8;
        }

        .dropdown-icon {
          color: #faa807;
          width: 18px;
        }

        .logout-btn {
          color: #ff4444 !important;
        }

        /* Cart */
        .icon-btn.cart {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #faa807, #ffd13d);
          color: white;
          text-decoration: none;
          margin: 0 5px;
        }

        .cart-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ff4444;
          color: white;
          font-size: 12px;
          font-weight: 600;
          min-width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
        }

        /* ANIMATED MENU BUTTON */
        .menu-btn {
          width: 38px;
          height: 38px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg,#faa807,#ffd13d);
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .menu-btn span {
          height: 2px;
          width: 100%;
          background: #fff;
          transition: .4s;
        }

        .menu-btn.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px,5px);
        }
        .menu-btn.open span:nth-child(2) {
          opacity: 0;
        }
        .menu-btn.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px,-6px);
        }

        /* MOBILE / TABLET */
        @media (max-width: 1024px) {
          .left-group { display: flex; }
          .logo { display: none; }

          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            flex-direction: column;
            align-items: center;
            max-height: 0;
            overflow: hidden;
            transition: .4s;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }

          .nav-links.active {
            max-height: 400px;
            padding: 20px 0;
            gap: 20px;
          }

          .search-form {
            display: none;
          }

          .separator-line {
            display: none !important;
          }

          .franchise-header-btn {
            display: none;
          }

          .user-menu-btn .user-text {
            display: none;
          }

          .user-menu-btn .dropdown-arrow {
            display: none;
          }

          .user-menu-btn {
            padding: 8px;
          }

          .user-dropdown {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            border-radius: 0;
            transform: translateX(100%);
            animation: slideIn 0.3s forwards;
          }

          @keyframes slideIn {
            to {
              transform: translateX(0);
            }
          }
        }

        @media (max-width: 768px) {
          .nav-content {
            padding: 0 15px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;


