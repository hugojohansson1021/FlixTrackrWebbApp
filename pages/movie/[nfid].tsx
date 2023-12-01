
"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';



interface Movie {
  nfid: number;
  title: string;
  synopsis: string;
  img: string;
  // Lägg till fler fält här beroende på din API-respons
}

async function fetchMovieData(movieId: string) {
  const url = `https://unogsng.p.rapidapi.com/search?query=${movieId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ea288c17a7msh6a19bba9fede2fbp19d33cjsn1edce30e03b0',
      'X-RapidAPI-Host': 'unogsng.p.rapidapi.com'
    }
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

const MovieDetail = () => {
  const router = useRouter();
  // Använd nfid som är filnamnet och URL-parametern.
  const { nfid } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Se till att nfid inte är undefined eller en array innan API-anropet görs.
    const movieId = Array.isArray(nfid) ? nfid[0] : nfid;
    if (movieId) {
      fetchMovieData(movieId)
        .then(data => {
          // Kontrollera att datan har den struktur du förväntar dig.
          setMovie(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching movie data:', error);
          setIsLoading(false);
        });
    }
  }, [nfid]); // Kör endast när nfid uppdateras.

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>No movie data found.</div>;
  }

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
        </div>


      {/* Movie Details */}
      <main className="flex-grow text-black" style={{ backgroundColor: '#e5e7eb' }}>
        <div className="p-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <img src={movie.img} alt={movie.title} className="w-full object-contain my-4" />
          <p>{movie.synopsis}</p>
          {/* Här kan du lägga till ytterligare filmdata som ska visas */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-700 p-4 text-center">
        Footer Content
      </footer>
    </div>
  );
};

export default MovieDetail;
