import Author from "../models/Author";

export const createAuthor = async(res , req) => {

    try {
        const { name, nationality } = req.body
    
        if(!name) {
          return res.status(400).json(
            {
              success: false,
              message: "name of the author is required"
            }
          )
        }
        const newAuthor = await Author.create(
          {
            name,
            nationality
          }
        )

        // const UserId = req.params{
        //     user{
        //         _id
        //     }
        // }

        //   if(User._id != userId)

        res.status(201).json(
          {
            success: true,
            message: "Author created",
            data: newAuthor
          }
        )
      } catch (error) {
        res.status(500).json(
          {
            success: false,
            message: "Author cant be created",
            error: error.message
          }
        )
      }
    
};

// getAuthors
// updateAuthorById

// deleteAuthorById