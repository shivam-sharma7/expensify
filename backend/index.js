import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './database/db.js';

const app = express();

const httpServer = http.createServer(app);

import mergeResolvers from './resolvers/index.js';
import mergeTypeDefs from './typeDefs/index.js';

const server = new ApolloServer({
    typeDefs: mergeTypeDefs,
    resolvers: mergeResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    '/',
    cors(),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  
await connectDB();

await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
 
console.log(`🚀 Server ready at http://localhost:4000`);