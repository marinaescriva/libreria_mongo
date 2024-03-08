
import User from "../models/User.js";
import { getUsersService } from "../services/userService.js";

const addBookToFavourite = async(req, res) => {
  try {
    const bookId = req.body.bookId;
    // debe venir por el token
    const userId = req.body.userId;

    const user = await User.findOne(
      {
        _id: userId
      }
    )

    // console.log(user);

    //validacion de si el user existe

    user.favouriteBooks.push(bookId);
    await user.save();

    res.status(200).json(
      {
        success: true,
        message: `Book added to user as favourite`,
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Book cant added to user as favourite",
        error: error.message
      }
    )
  }
}

const getUsers = async(req, res) => { 

  const findusers = await getUsersService()
  
    try {
 
       res.status(201).json(
          {
             success: true,
             message: "Users retrieved succesfully",
             data: findusers
          }
       )
    } catch (error) {
       res.status(500).json(
          {
             success: false,
             message: "ERROR",
             error: error.message
          }
       )
    }
 }


export { addBookToFavourite , getUsers }