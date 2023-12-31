"use client"
import React, { useState } from 'react';
import Header from '../components/Header';


interface Djur {
  namn: string;
  klass: string;
  ordning: string;
}

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Djur[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/animals?search=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResults([]);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Animals Page</h1>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sök efter djur"
            className="border border-gray-300 p-2 rounded-lg mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Sök
          </button>
        </div>

        <div>
          {results.length > 0 ? (
            results.map((animal, index) => (
              <div key={index} className="mb-2 p-2 border-b border-gray-200">
                <h2 className="text-lg font-semibold">{animal.namn}</h2>
                <p>Klass: {animal.klass}</p>
                <p>Ordning: {animal.ordning}</p>
              </div>
            ))
          ) : (
            <p>Inga djur hittades</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
