import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router(); // it connects parent and child routes.//parent is present index.js

// /books is prefixed by default in all child routes from parent route

//route for save a new book
router.post('/',async(request, response)=>{
    try{
        //validating all data that are sent as query parameters from url
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message:'Send all required fields: title, author , publishYear',
            });
        }
        const newBook={
            title:request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
        
    } catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route for Get all books from database
router.get('/',async(request, response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        console.log(error.message);
        //sending response: books and books count as object properties, enclosed in js object.
        response.status(500).send({message:error.message});
    }
});

// Route for Get one specific book using id from database
router.get('/:id',async(request, response)=>{
    try{
        const {id} = request.params; //getting id from uri path
        const book = await Book.findById(id);
        //returning single book
        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for Update a book
router.put('/:id',async(request, response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message:'Send all required fields: title, author , publishYear',
            });
        }
        const {id} = request.params; //getting id from uri path
        const isBookUpdated = await Book.findByIdAndUpdate(id, request.body);
        //returning single book
        if(!isBookUpdated){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).json({message:"Book updated successfully"});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for Update a book
router.delete('/:id',async(request, response)=>{
    try{
        const {id} = request.params; //getting id from uri path
        const isBookDeleted = await Book.findByIdAndDelete(id);

        if(!isBookDeleted){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).send({message:"Book deleted successfully"});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;