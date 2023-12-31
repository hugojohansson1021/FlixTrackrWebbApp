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
  { namn: "Elefant", klass: "Däggdjur", ordning: "Proboscidea" },
  { namn: "Havskatt", klass: "Fiskar", ordning: "Siluriformes" },
  { namn: "Röd Panda", klass: "Däggdjur", ordning: "Carnivora" },
  { namn: "Papegoja", klass: "Fåglar", ordning: "Psittaciformes" },
  { namn: "Komodovaran", klass: "Reptiler", ordning: "Squamata" },
  { namn: "Kamel", klass: "Däggdjur", ordning: "Artiodactyla" },
  { namn: "Kejsarpingvin", klass: "Fåglar", ordning: "Sphenisciformes" },
  { namn: "Gråval", klass: "Däggdjur", ordning: "Cetacea" },
  { namn: "Koala", klass: "Däggdjur", ordning: "Diprotodontia" },
  { namn: "Guldfisk", klass: "Fiskar", ordning: "Cypriniformes" },
  { namn: "Kungskobra", klass: "Reptiler", ordning: "Squamata" },
  { namn: "Hund", klass: "Däggdjur", ordning: "Carnivora" },
  { namn: "Katt", klass: "Däggdjur", ordning: "Carnivora" },
  { namn: "Kanin", klass: "Däggdjur", ordning: "Lagomorpha" },
  { namn: "Hamster", klass: "Däggdjur", ordning: "Rodentia" },
  { namn: "Giraff", klass: "Däggdjur", ordning: "Artiodactyla" },
  { namn: "Zebra", klass: "Däggdjur", ordning: "Perissodactyla" },
  { namn: "Noshörning", klass: "Däggdjur", ordning: "Perissodactyla" },
  { namn: "Hippopotamus", klass: "Däggdjur", ordning: "Artiodactyla" },
  { namn: "Panda", klass: "Däggdjur", ordning: "Carnivora" },
  { namn: "Känguru", klass: "Däggdjur", ordning: "Diprotodontia" },
  { namn: "Struts", klass: "Fåglar", ordning: "Struthioniformes" },
  { namn: "Gorilla", klass: "Däggdjur", ordning: "Primates" },
  { namn: "Chimpanze", klass: "Däggdjur", ordning: "Primates" },
  { namn: "Tiger", klass: "Däggdjur", ordning: "Carnivora" },
  { namn: "Häst", klass: "Däggdjur", ordning: "Perissodactyla" },
  { namn: "Ko", klass: "Däggdjur", ordning: "Artiodactyla" },
  { namn: "Svin", klass: "Däggdjur", ordning: "Artiodactyla" },
  { namn: "Får", klass: "Däggdjur", ordning: "Artiodactyla" },
  { namn: "Get", klass: "Däggdjur", ordning: "Artiodactyla" },
  { namn: "Llama", klass: "Däggdjur", ordning: "Artiodactyla" },
  { namn: "Alpacka", klass: "Däggdjur", ordning: "Artiodactyla" },
  { namn: "Björn", klass: "Däggdjur", ordning: "Carnivora" },
  { namn: "Varg", klass: "Däggdjur", ordning: "Carnivora" },
  { namn: "Räv", klass: "Däggdjur", ordning: "Carnivora" },
  { namn: "Isbjörn", klass: "Däggdjur", ordning: "Carnivora" },
  { namn: "Jaguar", klass: "Däggdjur", ordning: "Carnivora" }
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
