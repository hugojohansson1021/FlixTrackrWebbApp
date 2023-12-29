import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><a href="/home">Hem</a></li>
        <li><a href="/about">Om Oss</a></li>
        <li><a href="/contact">Kontakt</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
