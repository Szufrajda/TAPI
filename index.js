<<<<<<< HEAD
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
=======
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/schema.js';
import perfumeRoutes from './routes/PerfumeRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

// Routing dla REST API
app.use('/api/perfumes', perfumeRoutes);


const startServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs, 
      resolvers,
      introspection: true,
      playground: true,
    });

    await server.start();
console.log('🚀 Apollo Server wystartował!');

server.applyMiddleware({ app, path: '/graphql' });
console.log(`🚀 Endpoint GraphQL działa na http://localhost:${PORT}/graphql`);



    app.get('/', (req, res) => {
      res.send('API do zarządzania perfumami działa!');
    });


    app.use((req, res) => {
      res.status(404).json({ error: 'Nie znaleziono zasobu.' });
    });

 
    app.listen(PORT, () => {
      console.log(`Serwer REST działa na http://localhost:${PORT}`);
      console.log(`GraphQL działa na http://localhost:${PORT}/graphql`);
    });

  } catch (error) {
    console.error('Błąd podczas uruchamiania serwera:', error.message);
    process.exit(1); 
  }
};


startServer();
>>>>>>> df7623a (Poprawa projektu wraz z dodaniem poprawnego graphql)
