
import Book from "../models/Book.js"

export const createBook = async(req, res) => {
  try {
    const { title, description, author } = req.body
    // const title = req.body.title
    if(!title || !description || !author) {
      return res.status(400).json(
        {
          success: false,
          message: "title description and author required"
        }
      )
    }
    const newBook = await Book.create(
      {
        // title: title
        title,
        description,
        author
      }
    )
    res.status(201).json(
      {
        success: true,
        message: "Book created",
        data: newBook
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Book cant created",
        error: error.message
      }
    )
  }
}

export const getBooks = async(req, res) =>{
    try {
        const books = await Book.find().select('title').select('author'); //select solo selecciona un parametro

        res.status(200).json(
            {
              success: true,
              message: "Book retrieved",
              data: books
            }
          )
        
    } catch (error) {
        
    res.status(500).json(
        {
          success: false,
          message: "Book cant retrieved",
          error: error.message
        }
      )
        
    }
}

export const updateBookById = async(req, res) =>{
   
    try {
        const { title } = req.body // el dato que queremos cambiar por body
    
        const bookId = req.params.id //como el isbn es único
    
        if (!title) {
          return res.status(400).json(
            {
              success: true,
              message: "title required",
            }
          )
        }
    
        const bookUpdated = await Book.findOneAndUpdate( //busqueda de un libro por su title
          {
            _id: bookId 
          },
          {
            title: title
          },
          {
            new: true //muestra el update
          }
        )
    
        res.status(200).json(
          {
            success: true,
            message: "Book updated",
            data: bookUpdated
          }
        )
      } catch (error) {
        res.status(500).json(
          {
            success: false,
            message: "Book cant retrieved",
            error: error.message
          }
        )
      }
}

export const deleteBookById = async (req, res) => {
    
    try {
        const bookId = req.params.id // el dato que queremos eliminar
    
        if (!bookId) {
          return res.status(400).json(
            {
              success: true,
              message: "invalid bookId or isnt correct",
            }
          )
        }
        console.log(bookId , "1")
        
        const bookDeleted = await Book.findOneAndDelete( //pull para borrar solo un campo del libro
            {
            _id:bookId  //busqueda de un libro y lo elimina si el id coincide con el que pasas en ruta
            }
        )

        console.log(bookDeleted._id , "2")
    
        res.status(200).json(
          {
            success: true,
            message: "Book deleted",
            data: bookDeleted
          }
        )

        console.log("3")
      } catch (error) {
        res.status(500).json(
          {
            success: false,
            message: "Book cant be deleted",
            error: error.message
          }
        )
      }
}