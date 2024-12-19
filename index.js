import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/schema.js';
import perfumeRoutes from './routes/PerfumeRoutes.js';

// Inicjalizacja serwera
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

// Funkcja uruchamiająca serwer Apollo
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
