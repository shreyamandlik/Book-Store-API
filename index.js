const express = require("express");
const bodyParser = require("body-parser")
const mongoose=require("mongoose")
require("dotenv").config();

//Database
const database = require("./Database/database")

//models
const BookModel=require("./Database/Books")
const AuthorModel=require("./Database/Authors")
const PublicationModel=require("./Database/Publication")

//Initialise
const booky = express();

booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
    
}).then(()=>console.log("Connection Established"));

/*----------------------- */
/*
Route     /
Access    Public
Desc      Get all books
Param     None
Method    Get
*/
booky.get("/", async (req, res) => {
    const getAllBooks= await BookModel.find();
    return res.json(getAllBooks);
})

/*
Route     /is
Access    Public
Desc      Get books baed on id
Param     isbn
Method    Get
*/
booky.get("/is/:isbn", async(req, res) => {

    const getSpecificBook= await BookModel.findOne({isbn:req.params.isbn});

    if (!getSpecificBook) {
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}` })
    }
    return res.json({ books: getSpecificBook })
})

/*
Route     /c
Access    Public
Desc      Get books baed on category
Param     category
Method    Get
*/
booky.get("/c/:category", async(req, res) => {
    const getSpecificBook= await BookModel.findOne({category:req.params.category});

    if (!getSpecificBook) {
        return res.json({ error: `No book found for the category of ${req.params.category}` })
    }
    return res.json({ books: getSpecificBook })
})

/*
Route     /lan
Access    Public
Desc      Get books baed on language
Param     language
Method    Get
*/
booky.get("/lan/:language", async(req, res) => {
    const getSpecificBook= await BookModel.findOne({language:req.params.language});

    if (!getSpecificBook) {
        return res.json({ error: `No book found for the ISBN of ${req.params.language}` })
    }
    return res.json({ books: getSpecificBook })
})


/*----------------------- */
/*
Route     /author
Access    Public
Desc      Get all authors
Param     None
Method    Get
*/
booky.get("/author", async (req, res) => {
    const getAllAuthors= await AuthorModel.find();
    return res.json(getAllAuthors);
}) 

/*
Route     /ID
Access    Public
Desc      Get author based on id
Param     id
Method    Get
*/
booky.get("/author/ID/:id", async(req, res) => {
    const getSpecificAuthor= await AuthorModel.findOne({id:req.params.id});

    if (!getSpecificAuthor) {
        return res.json({ error: `No Author found for the id of ${req.params.id}` })
    }
    return res.json({ author: getSpecificAuthor })
})

/*
Route     /book
Access    Public
Desc      Get author based on book
Param     isbn
Method    Get
*/
booky.get("/author/book/:isbn", async(req, res) => {
    const getSpecificAuthor= await AuthorModel.findOne({isbn:req.params.isbn});

    if (!getSpecificAuthor) {
        return res.json({ error: `No Author found for the book of ${req.params.isbn}` })
    }
    return res.json({ author: getSpecificAuthor })
})


/*----------------------- */
/*
Route     /pub
Access    Public
Desc      Get all publication
Param     None
Method    Get
*/
booky.get("/pub", async (req, res) => {
    const getAllPublications= await PublicationModel.find();
    return res.json(getAllPublications);
})


/*
Route     /ID
Access    Public
Desc      Get publication based on id
Param     id
Method    Get
*/
booky.get("/pub/ID/:id", async(req, res) => {
    const getSpecificPublication= await PublicationModel.findOne({id:req.params.id});

    if (!getSpecificPublication) {
        return res.json({ error: `No Publication found for the id of ${req.params.id}` })
    }
    return res.json({ publication: getSpecificPublication })
})

/*
Route     /book
Access    Public
Desc      Get publication based on book
Param     isbn
Method    Get
*/
booky.get("/pub/book/:isbn", async(req, res) => {
    const getSpecificPublication= await PublicationModel.findOne({isbn:req.params.isbn});

    if (!getSpecificPublication) {
        return res.json({ error: `No Publication found for the book of ${req.params.isbn}` })
    }
    return res.json({ publication: getSpecificPublication })
})

/*__________POST REQUEST API_________*/
/*-----------------------*/
/*
Route     /book/new
Access    Public
Desc      Add new book
Param     none
Method    POST
*/
booky.post("/book/new", async(req, res) => {
    const {newBook} = req.body;

    // Check if a book with the same ISBN already exists
    const existingBook = await BookModel.findOne({ isbn: newBook.isbn });

    if (existingBook) {
        // Book with the given ISBN already exists, return an error message
        return res.status(400).json({
            message: "Book with the given ISBN already exists",
        });
    }

    const addNewBook= BookModel.create(newBook)
    return res.json({ 
        books:addNewBook,
        message:"New Book Added"
     });
})

/*-----------------------*/
/*
Route     /author/new
Access    Public
Desc      Add new author
Param     none
Method    POST
*/
booky.post("/author/new", async(req, res) => {
    const {newAuthor} = req.body;

 // Check if a author with the same id already exists
 const existingAuthor = await AuthorModel.findOne({ id: newAuthor.id });

 if (existingAuthor) {
     // Author with the given ISBN already exists, return an error message
     return res.status(400).json({
         message: "Author with the given ID already exists",
     });
 }

    const addNewAuthor= AuthorModel.create(newAuthor)
    return res.json({ 
        books:addNewAuthor,
        message:"New Author Added"
     });
})

/*-----------------------*/
/*
Route     /pub/new
Access    Public
Desc      Add new publication
Param     none
Method    POST
*/
booky.post("/pub/new", async(req, res) => {
    const {newPublication} = req.body;

 // Check if a pub with the same Id already exists
 const existingPublication = await PublicationModel.findOne({ id: newPublication.id });

 if (existingPublication) {
     // pub with the given Id already exists, return an error message
     return res.status(400).json({
         message: "Publication with the given ID already exists",
     });
 }

    const addNewPublication= PublicationModel.create(newPublication)
    return res.json({ 
        books:addNewPublication,
        message:"New Publication Added"
     });
})


/*__________PUT REQUEST API_________*/
/*-----------------------*/
/*
Route     /book/update
Access    Public
Desc      update book on isbn
Param     isbn
Method    PUT
*/
booky.put("/book/update/:isbn",async(req,res)=>{
const updatedBook=await BookModel.findOneAndUpdate(
    {
        isbn: req.params.isbn
    },
    {
        title: req.body.bookTitle
    },
    {
        new:true
    }
)
return res.json({books:updatedBook})
})

/*
Route            /book/author/update
Description      Update /add new author
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/book/author/update/:isbn", async(req,res) =>{
  //Update book database
const updatedBook = await BookModel.findOneAndUpdate(
  {
    isbn: req.params.isbn
  },
  {
    $addToSet: {
      authors: req.body.newAuthor
    }
  },
  {
    new: true
  }
);
  //Update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor
    },
    {
      $addToSet: {
        books: req.params.isbn
      }
    },
    {
      new: true
    }
  );

  return res.json(
    {
      bookss: updatedBook,
      authors: updatedAuthor,
      message: "New author was added"
    }
  );
} );


/*
Route     /pub/update/book
Access    Public
Desc      update or add a new publication
Param     isbn
Method    PUT
*/

booky.put('/pub/update/book/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const pubId = req.body.pubId;

    // Check if the ISBN exists in the books collection
    const book = await BookModel.findOne({ isbn });
    if (!book) {
      return res.status(404).json({
        message: 'ISBN doesn\'t exist',
      });
    }

    // Find the book's previous publication
    const previousPublication = await PublicationModel.findOne({ id: book.publication });

    // Update the publication and remove the book from its previous publication
    const updatedPublication = await PublicationModel.findOneAndUpdate(
      { id: pubId },
      { $push: { books: isbn } },
      { new: true }
    );

    if (previousPublication && previousPublication.id !== pubId) {
      await PublicationModel.findOneAndUpdate(
        { id: previousPublication.id },
        { $pull: { books: isbn } }
      );
    }

    // Update the book's publication
    await BookModel.findOneAndUpdate({ isbn }, { publication: pubId });

    return res.json({
      books: await BookModel.find(),
      publication: updatedPublication,
      message: 'Successfully updated publication',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


/*
Route     /author/update/book
Access    Public
Desc      update or add a new author
Param     isbn
Method    PUT
*/
booky.put('/author/update/book/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const autId = req.body.autId;

    // Check if the ISBN exists in the books collection
    const book = await BookModel.findOne({ isbn });
    if (!book) {
      return res.status(404).json({
        message: 'ISBN doesn\'t exist',
      });
    }

    // Find the book's previous author
    const previousAuthor = await AuthorModel.findOne({ id: book.author });

    // Update the author and remove the book from their previous author
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      { id: autId },
      { $push: { books: isbn } },
      { new: true }
    );

    if (previousAuthor && previousAuthor.id !== autId) {
      await AuthorModel.findOneAndUpdate(
        { id: previousAuthor.id },
        { $pull: { books: isbn } }
      );
    }

    // Update the book's author
    await BookModel.findOneAndUpdate({ isbn }, { author: autId });

    return res.json({
      books: await BookModel.find(),
      author: updatedAuthor,
      message: 'Successfully updated author',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


/*__________DELETE REQUEST API_________*/
/*
Route     /book/delete
Access    Public
Desc      Delete a book and remove references from authors and publications
Param     isbn
Method    DELETE
*/

// Assuming you have an Express app already set up
booky.delete('/book/delete/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;

    // Remove the book from the books collection
    await BookModel.findOneAndDelete({ isbn });

    // Remove the book from the author collections where it's referenced
    await AuthorModel.updateMany({}, { $pull: { books: isbn } });

    // Remove the book from the publication collections where it's referenced
    await PublicationModel.updateMany({}, { $pull: { books: isbn } });

    return res.json({
      message: `Book with ISBN ${isbn} deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/*
Route     /author/delete
Access    Public
Desc      Delete a author and remove references from books
Param     id
Method    DELETE
*/
booky.delete("/author/delete/:id", async(req,res)=>{
  try {
    const id=req.params.id
   
    // Remove the author from the authors collection
    await AuthorModel.findOneAndDelete({ id });

    // Remove the author from the books collections where it's referenced
    await BookModel.updateMany({}, { $pull: { author : id } });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/*
Route     /pub/delete
Access    Public
Desc      Delete a publication and remove references from books
Param     id
Method    DELETE
*/
booky.delete("/pub/delete/:id", async(req,res)=>{
  try {
    const id=req.params.id
   
    // Remove the publication from the publication collection
    await PublicationModel.findOneAndDelete({ id });

    // Remove the author from the books collections where it's referenced
    await BookModel.updateMany({}, { $pull: { publication : id } });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})


/*
Route     /book/delete/author
Access    Public
Desc      delete author from book and related book from author
Param     isbn, authorId
Method    DELETE
*/

booky.delete('/book/delete/author/:isbn/:authorId', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const authorId = parseInt(req.params.authorId);

    // Update the book's author list
    await BookModel.findOneAndUpdate(
      { isbn },
      { $pull: { author: authorId } }
    );

    // Update the author's book list
    await AuthorModel.findOneAndUpdate(
      { id: authorId },
      { $pull: { books: isbn } }
    );

    return res.json({
      message: `Author with ID ${authorId} deleted from book with ISBN ${isbn}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


/*
Route     /book/delete/publication
Access    Public
Desc      delete publication from book and related book from publication
Param     isbn, pubId
Method    DELETE
*/

booky.delete('/book/delete/publication/:isbn/:pubId', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const pubId = parseInt(req.params.pubId);

    // Update the book's publication
    await BookModel.findOneAndUpdate(
      { isbn },
      { publication: '' } // Assuming you want to clear the publication for this book
    );

    // Update the publication's book list
    await PublicationModel.findOneAndUpdate(
      { id: pubId },
      { $pull: { books: isbn } }
    );

    return res.json({
      message: `Publication with ID ${pubId} deleted from book with ISBN ${isbn}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






booky.listen(4000, () => {
    console.log("server is up and running");
})