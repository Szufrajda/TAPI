import express from 'express';
import perfumeRoutes from './routes/perfumeRoutes.js';

const app = express();
app.use(express.json()); // do obsługi JSON w ciele zapytań

// Używamy zdefiniowanych tras z folderu routes
app.use('/perfumy', perfumeRoutes);

// Uruchamiamy serwer na porcie 8989
app.listen(8989, () => {
    console.log("Started on 8989");
});