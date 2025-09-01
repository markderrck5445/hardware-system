import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import pic1 from '../img/pic1.png'; 

function Link({ to, children, className = "", ...props }) {
    return (
        <a href={to} className={className} {...props}>
            {children}
        </a>
    );
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  // Function to determine active link based on current URL
  const getCurrentPage = () => {
    const path = window.location.pathname;
    if (path === '/' || path === '/home') {
      return 'Home';
    } else if (path === '/shop' || path.startsWith('/shop')) {
      return 'Shop';
    } else if (path === '/contact' || path.startsWith('/contact')) {
      return 'Contact';
    } else if (path.startsWith('/categories/')) {
      return 'Categories';
    }
    return '';
  };

  // Set active link on component mount and when URL changes
  useEffect(() => {
    const updateActiveLink = () => {
      setActiveLink(getCurrentPage());
    };

    updateActiveLink();

    // Listen for browser navigation (back/forward buttons)
    window.addEventListener('popstate', updateActiveLink);
    
    // Optional: Listen for hash changes if you use hash routing
    window.addEventListener('hashchange', updateActiveLink);

    return () => {
      window.removeEventListener('popstate', updateActiveLink);
      window.removeEventListener('hashchange', updateActiveLink);
    };
  }, []);

  const categories = [
    { name: 'Electronics', path: './electronics' },
    { name: 'Paints', path: './paint' },
    { name: 'Accessories', path: './accessories' },
  ];

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleLinkClick = (linkName, to) => {
    // Update active link immediately for better UX
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryName, categoryPath) => {
    setActiveLink('Categories');
    setIsCategoriesOpen(false);
    setIsMobileMenuOpen(false);
    // Navigate to the category page
    window.location.href = categoryPath;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  return (
    <div className="navbar-wrapper">
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            
            {/* Logo - Left Side */}
            <div className="navbar-logo">
             <img src={pic1} />
            </div>

            {/* Desktop Navigation - Center */}
            <div className="desktop-nav">
              {navigationLinks.map((link) => (
                <div key={link.name} className="nav-link-wrapper">
                  <Link
                    to={link.path}
                    className={`nav-link ${activeLink === link.name ? 'nav-link-active' : ''}`}
                    onClick={() => handleLinkClick(link.name, link.path)}
                  >
                    {link.name}
                  </Link>
                  <div className={`nav-underline ${activeLink === link.name ? 'nav-underline-active' : ''}`}></div>
                </div>
              ))}
              
              {/* Categories Dropdown */}
              <div 
                className="categories-dropdown"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className={`categories-button ${activeLink === 'Categories' ? 'categories-button-active' : ''}`}>
                  <span>Categories</span>
                  <ChevronDown 
                    size={16} 
                    className={`chevron-icon ${isCategoriesOpen ? 'chevron-rotated' : ''}`}
                  />
                </button>
                <div className={`categories-underline ${activeLink === 'Categories' ? 'categories-underline-active' : ''}`}></div>
                
                {/* Dropdown Menu */}
                <div className={`dropdown-menu ${isCategoriesOpen ? 'dropdown-menu-visible' : ''}`}>
                  <div className="dropdown-content">
                    {categories.map((category, index) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className={`dropdown-item ${index !== categories.length - 1 ? 'dropdown-item-bordered' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category.name, category.path);
                        }}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="navbar-actions">
              {/* Icons visible on all screen sizes */}
              <div className="navbar-icons">
                <Link 
                  to="/search" 
                  className="icon-button"
                  title="Search"
                >
                  <Search size={20} />
                </Link>
                <Link 
                  to="/cart" 
                  className="icon-button cart-button"
                  title="Shopping Cart"
                >
                  <ShoppingCart size={20} />
                  {/* Cart badge */}
                  <span className="cart-badge">300</span>
                </Link>
                <Link 
                  to="./account" 
                  className="icon-button"
                  title="User Account"
                >
                  <User size={20} />
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-toggle"
                aria-label="Toggle mobile menu"
              >
                <div className="hamburger-wrapper">
                  <Menu 
                    size={24} 
                    className={`hamburger-icon ${isMobileMenuOpen ? 'hamburger-hidden' : 'hamburger-visible'}`}
                  />
                  <X 
                    size={24} 
                    className={`close-icon ${isMobileMenuOpen ? 'close-visible' : 'close-hidden'}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-menu-content">
            
            {/* Mobile Navigation Links */}
            {navigationLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-nav-link ${activeLink === link.name ? 'mobile-nav-link-active' : ''}`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => handleLinkClick(link.name)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="mobile-categories">
              <button
                onClick={toggleCategories}
                className={`mobile-categories-button ${activeLink === 'Categories' ? 'mobile-categories-button-active' : ''}`}
              >
                <span>Categories</span>
                <ChevronDown 
                  size={16} 
                  className={`mobile-chevron ${isCategoriesOpen ? 'mobile-chevron-rotated' : ''}`}
                />
              </button>
              
              {/* Mobile Categories Submenu */}
              <div className={`mobile-categories-submenu ${isCategoriesOpen ? 'mobile-categories-submenu-open' : ''}`}>
                <div className="mobile-submenu-content">
                  {categories.map((category, index) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="mobile-category-link"
                      style={{ transitionDelay: `${index * 30}ms` }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(category.name, category.path);
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-overlay-visible' : ''}`}
        onClick={closeMobileMenu}
      />
    </div>
  );
};

export default Navbar;