import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import perfumeRoutes from './routes/perfumeRoutes.js';

const app = express();

// Middleware do obsługi CORS
app.use(cors());

// Middleware do obsługi JSON w ciele zapytań
app.use(express.json());

// Middleware logujący
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Middleware do ustawiania nagłówków HTTP dla każdej odpowiedzi
app.use((req, res, next) => {
    res.set({
        'Content-Type': 'application/json',
        'Allow': 'GET, POST, PATCH, PUT, DELETE',
        'Cache-Control': 'no-store'
    });
    next();
});

// Trasy REST API
app.use('/perfumy', perfumeRoutes);

// Konfiguracja serwera GraphQL
const server = new ApolloServer({
    typeDefs,
    resolvers
});

await server.start();
server.applyMiddleware({ app });

// Middleware do obsługi błędów
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Uruchamianie serwera
app.listen(8989, () => {
    console.log('Serwer uruchomiony na porcie 8989');
    console.log(`GraphQL Playground dostępny pod: http://localhost:8989${server.graphqlPath}`);
});
