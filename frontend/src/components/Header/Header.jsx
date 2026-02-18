import React, { useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // Sticky header
  const handleStickyHeader = () => {
    if (window.scrollY > 80) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header
      className="shadow-sm header z-50 bg-white"
      ref={headerRef}
    >
      <div
        style={{
          width: "100%",
          padding: "0 40px",
          minHeight: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="Logo" style={{ height: "32px" }} />
        </Link>

        {/* Nav */}
        <nav ref={menuRef} className="navigation" onClick={toggleMenu}>
          <ul className="menu">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[var(--primaryColor)] text-sm font-semibold"
                      : "text-[var(--textColor)] text-sm font-medium hover:text-[var(--primaryColor)]"
                  }
                >
                  {link.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link to="/">
            <img
              src={userImg}
              alt=""
              className="hidden"
              style={{
                height: "36px",
                width: "36px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </Link>

          <Link to="/login">
            <button
              style={{
                backgroundColor: "#0067ff",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                padding: "10px 25px",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>

          <span className="md:hidden" onClick={toggleMenu}>
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
