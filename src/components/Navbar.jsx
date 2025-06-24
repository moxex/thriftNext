import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'COLLECTIONS', path: '/collection' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const cartItemCount = 10; // Replace with actual cart count

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="ThriftNext Logo" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? 'text-black font-semibold' : ''
              }`
            }
          >
            <p>{link.name}</p>
            <div
              className={`h-[2px] w-1/2 bg-gray-700 transition-opacity ${
                link.path === window.location.pathname
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            />
          </NavLink>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Dropdown */}
        <div className="relative group">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="User Profile"
          />
          <div className="absolute right-0 pt-4 hidden group-hover:block">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600 rounded shadow">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <p className="absolute -right-1 -bottom-1 w-4 h-4 bg-black text-white rounded-full text-[8px] flex items-center justify-center">
            {cartItemCount}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 transition-all duration-300 ease-in-out ${
          visible ? 'w-4/5 shadow-lg' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Close menu"
            />
            <p>Back</p>
          </div>

          {navLinks.map(link => (
            <NavLink
              key={link.name}
              onClick={() => setVisible(false)}
              to={link.path}
              className="py-3 pl-6 border-t hover:bg-gray-50"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
