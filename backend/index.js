import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

//connecting mongo
mongoose.connect(mongoDBURL) 
.then(()=>{
    console.log('App connected to database');
    //to check server is started
    app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`)
    });
})
.catch((error)=>{
    console.log(error);
});

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books',booksRoute); // this parent path is prefixed with all the child http method handlers

