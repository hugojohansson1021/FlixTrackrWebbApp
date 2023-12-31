import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-200 shadow-md p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/">
            <span className="cursor-pointer text-black hover:text-gray-700 transition duration-300 px-3 py-2 rounded-md">Hem</span>
          </Link>
        </li>
        <li>
          <Link href="/animals">
            <span className="cursor-pointer text-black hover:text-gray-700 transition duration-300 px-3 py-2 rounded-md">Animals</span>
          </Link>
        </li>
        <li>
          <Link href="/shop">
            <span className="cursor-pointer text-black hover:text-gray-700 transition duration-300 px-3 py-2 rounded-md">Shop</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Header = () => {
  return (
    <header>
      <Navbar />
    </header>
  );
};

export default Header;
