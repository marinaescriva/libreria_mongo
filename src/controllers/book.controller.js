
import Book from "../models/Book.js"
import { handleError } from "../utils/handleError.js"

export const createBook = async (req, res) => {
  try {
    const { title, description, author } = req.body
    // const title = req.body.title
    // throw new Error('title description and author required') //forzar a entrar al catch


    if (!title || !description || !author) {

     
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
    if (error.message === 'title description and author required') { //revisar si funciona
      handleError(res, "cant create book", 404) 
    }
    handleError(res, "cant create book",500)

  }
}

export const getBooks = async (req, res) => {
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

export const updateBookById = async (req, res) => {

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


    const bookDeleted = await Book.findOneAndDelete( //pull para borrar solo un campo del libro
      {
        _id: bookId  //busqueda de un libro y lo elimina si el id coincide con el que pasas en ruta
      }
    )


    res.status(200).json(
      {
        success: true,
        message: "Book deleted",
        data: bookDeleted
      }
    )


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