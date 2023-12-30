const express = require('express');
const next = require('next');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

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

  // Aktivera CORS för alla förfrågningar
  server.use(cors());

  // Eller konfigurera CORS mer specifikt
  // server.use(cors({
  //   origin: 'https://example.com', // Tillåt bara förfrågningar från denna ursprung
  //   methods: ['GET', 'POST'], // Tillåt dessa HTTP-metoder
  // }));

  // Skapa en begränsare för förfrågningar
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuter
    max: 100 // begränsa varje IP till 100 förfrågningar per fönsterMs
  });

  // Använd begränsaren för alla förfrågningar
  server.use(limiter);

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
