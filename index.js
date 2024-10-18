import express from 'express';
import perfumeRoutes from './routes/perfumeRoutes.js';  // Importujemy trasy dla perfum
import fs from 'fs';  // Dodajemy fs do zarządzania plikami

const app = express();
app.use(express.json()); // Middleware do obsługi JSON w ciele zapytań

// Używamy tras dla perfum
app.use('/perfumy', perfumeRoutes);

// Uruchamiamy serwer na porcie 8989
app.listen(8989, () => {
    console.log("Serwer uruchomiony na porcie 8989");
});
