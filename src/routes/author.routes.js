import { Router} from "express";
import { createAuthor } from "../controllers/author.controller.js";
import { auth } from "../middlewares/auth.js";


const router = Router();

router.post('/', auth, createAuthor );
// router.get('/', getAuthors);
// router.put('/:id', updateAuthorById );
// router.delete('/:id', deleteAuthorById );


export default router; 