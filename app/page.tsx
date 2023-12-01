
"use client"

import React, { useState } from 'react';

import Link from 'next/link';
import './images/flags.css'





interface Movie {
  nfid: number;
  title: string;
  synopsis: string;
  img: string;
  clist: string; // Länder där filmen är tillgänglig
  // Lägg till fler fält om det behövs
}


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  

  const handleSearch = async () => {
    if (!searchTerm) return;
    setIsLoading(true);

    const url = `https://unogsng.p.rapidapi.com/search?query=${encodeURIComponent(searchTerm)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ea288c17a7msh6a19bba9fede2fbp19d33cjsn1edce30e03b0',
        'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.results);
      setResults(data.results);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Navbar */}
      <div>
      <nav className="bg-gray-700 p-4 flex items-center">
        <h1 className="text-red-500 text-xl font-bold">FlixTrackr</h1>
      </nav>
      </div>

      {/* Header */}
      <header className="bg-gray-100 p-4 text-center text-gray-800 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Netflix Global Search Engine</h2>
        <p className="mb-4">Unlock the world of entertainment with the Netflix Global Search Engine. Find your favorite movies and explore where you can watch them by leveraging a VPN. With this powerful tool, you can search for any movie title and instantly discover the countries where it is available on Netflix. Whether you're a cinephile, a casual moviegoer, or simply curious about international film offerings, this innovative feature allows you to broaden your cinematic horizons. By utilizing a VPN (Virtual Private Network), you can easily access movies that are geographically restricted, opening up a plethora of content choices. Seamlessly navigate through Netflix's extensive library, with the ability to view films from various countries across the globe. Experience diverse cultures, languages, and storytelling styles right from the comfort of your own home. Don't miss out on the movie magic you've been longing for. Empower yourself with the Netflix Global Search Engine and VPN, empowering you to find and enjoy movies regardless of their regional availability. Start exploring today and embark on a cinematic adventure that knows no boundaries.</p>
      </header>

      {/* Main Content och Aside */}
      <div className="flex-grow flex flex-row-reverse">
        {/* Aside-sektionen */}
        <aside className="w-1/4 bg-gray-200 p-4">
          {/* Innehåll för aside-sektionen */}
        </aside>

        {/* Huvudinnehåll med sökfält och knapp */}
        
        <main className="w-3/4 bg-white p-4 flex flex-col justify-start overflow-auto" style={{ maxHeight: '500px' }}>
  <div className="w-full flex justify-center items-center mb-4">
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Enter movie title..."
        className="w-3/4 p-2 border border-gray-300 rounded-l shadow mr-2 text-black"
        onChange={handleInputChange}
        value={searchTerm}
      />
      <button
        onClick={handleSearch}
        className="bg-gray-500 text-white px-4 rounded hover:bg-gray-600 focus:outline-none"
      >
        Search
      </button>
    </div>
  </div>

  
  
  {isLoading ? (
          <p>Loading...</p>
        ) : (
          results.map((movie) => (
            <Link key={movie.nfid} href={`/movie/${movie.nfid}`} passHref>
            <div className="mb-4 border border-black rounded shadow-lg overflow-hidden min-h-[250px] cursor-pointer">
              
            <div className="flex md:flex-row">
              <img
                src={movie.img}
                alt={movie.title}
                className="w-full md:w-1/4 object-contain" // Anpassa bredden på bilden på större skärmar
              />
              <div className="flex flex-col justify-between p-4">
                <h3 className="text-black text-xl">{movie.title}</h3>
                <p className="text-black">{movie.synopsis}</p>
                <div className={`flag-icon ${movie.clist.split(':')[0]}`}></div> {/* Använd klassen från clist */}
                <p className=" text-black"> Contries avalible: </p>
                <p className=" text-black">{parseCountries(movie.clist)}</p> {/* Svart text */}

                
              </div>
              </div>
            </div>
            </Link>
          ))
          
        )}


</main>


      </div>

      {/* Footer */}
      <footer className="bg-gray-700 p-4 text-center">
        Footer
      </footer>
    </div>
  );


  
}


export const config = {
  runtime: 'client'
};


// En hjälpfunktion för att omvandla länder från clist till en läsbar sträng
function parseCountries(clist: string): string {
  // Ta bort citattecken och splittra vid komma
  const countries = clist.replace(/"/g, '').split(',');
  const countryNames = countries.map((country) => {
    // Splittra vid kolon och extrahera landets namn (det andra elementet)
    const parts = country.split(':');
    if (parts.length >= 2) {
      return parts[1].trim(); // Landets namn
    }
    return ''; // Om dataformatet är ogiltigt, returnera en tom sträng
  });
  // Ta bort eventuella tomma strängar och returnera som en kommaseparerad sträng
  return countryNames.filter((name) => name !== '').join(', ');
}
