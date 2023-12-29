import React from 'react';
import Link from 'next/link'; // Importera Link

const Navbar = () => {
  return (
    <nav className="bg-gray-200 text-white p-4">
      <ul className="flex flex-col space-y-2">
        <li className="text-white">
          <Link href="/">Hem</Link>
        </li>
        <li className="text-white">
          <Link href="/animals">animals</Link>
        </li>
        <li className="text-white">
          <Link href="/shop">Shop</Link>
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
