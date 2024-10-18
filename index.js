import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import perfumeRoutes from './routes/perfumeRoutes.js'; // REST API routes

const app = express();

// Middleware do obsługi JSON w ciele zapytań
app.use(express.json());

// REST API endpoint
app.use('/perfumy', perfumeRoutes);

// GraphQL serwer
const server = new ApolloServer({
    typeDefs,
    resolvers
});

await server.start();
server.applyMiddleware({ app });

// Uruchamiamy serwer na porcie 8989
app.listen(8989, () => {
    console.log('Serwer uruchomiony na porcie 8989');
    console.log(`GraphQL Playground dostępny pod: http://localhost:8989${server.graphqlPath}`);
});
