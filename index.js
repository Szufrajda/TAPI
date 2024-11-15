import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import perfumeRoutes from './routes/perfumeRoutes.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:8989',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'] !== 'application/json') {
        return res.status(415).json({ message: 'Możesz przesłać jedynie plik typu JSON!' });
    }
    next();
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

app.use((req, res, next) => {
    res.set({
        'Cache-Control': 'no-store',
        'X-Powered-By': 'Node.js',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
    });
    console.log('Nagłówki ustawione:', res.getHeaders());
    next();
});


app.use('/api', perfumeRoutes);

const server = new ApolloServer({
    typeDefs,
    resolvers
});

await server.start();
server.applyMiddleware({ app });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Coś poszło nie tak!');
});

app.listen(8989, () => {
    console.log('Serwer uruchomiony na porcie 8989');
    console.log(`GraphQL Playground dostępny pod: http://localhost:8989${server.graphqlPath}`);
});
