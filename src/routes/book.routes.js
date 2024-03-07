import { Router} from "express";
import { createBook, deleteBookById, getBooks, updateBookById } from "../controllers/book.controller.js";


const router = Router();

router.post('/', createBook );
router.get ('/', getBooks );
router.put('/:id', updateBookById);
router.delete('/:id', deleteBookById);

export default router; 