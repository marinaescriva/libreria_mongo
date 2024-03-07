import { Router} from "express";
import { createAuthor } from "../controllers/author.controller.js";


const router = Router();

router.post('/', createAuthor );
// router.get('/', getAuthors);
// router.put('/:id', updateAuthorById );
// router.delete('/:id', deleteAuthorById );


export default router; 