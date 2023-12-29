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
      <div>
        <h1>Animals Page</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Sök efter djur"
          
        />
        <button onClick={handleSearch}>Sök</button>

        <div>
          {results.length > 0 ? (
            results.map((animal, index) => (
              <div key={index}>
                <h2>{animal.namn}</h2>
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
