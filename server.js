const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Din djurdata
const djurData = [
  { namn: "Lejon", klass: "Däggdjur", ordning: "Rovdjur" },
  { namn: "Örn", klass: "Fåglar", ordning: "Rovfåglar" },
  { namn: "Krokodil", klass: "Reptiler", ordning: "Krokodildjur" },
  // Lägg till fler djur här
];

nextApp.prepare().then(() => {
  const server = express();

  // API-endpoint för att hämta djur
  server.get('/api/animals', (req, res) => {
    const search = req.query.search;
    if (search) {
      const filteredDjur = djurData.filter(djur => 
        djur.namn.toLowerCase().includes(search.toLowerCase())
      );
      res.json(filteredDjur);
    } else {
      res.json(djurData);
    }
  });

  // Hantera alla andra förfrågningar med Next.js
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
