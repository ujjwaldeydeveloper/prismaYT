import {Router} from 'express';

import { 
    createComment,
    showUserComment,
    updateComment,
    fetchCommments,
    deleteComment
} from '../Controller/CommentController.js';


const router = Router();

router.get('/', fetchCommments);

router.get('/:id', showUserComment);

router.post('/', createComment);

router.put('/:id', updateComment);

router.delete('/:id', deleteComment);

export default router;