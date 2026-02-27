import { Router } from 'express';
//import * as Note from '../models/notes.js';
import { Post } from '../models/index.js';

const router = Router();

// Memo List tanpa MDB
// router.get('/', (req, res, next) => {
//     const notes = Note.list();
//     res.json(notes);
// });

// router.get('/:id', (req, res, next) => {
//     const id = Number(req.params.id);
//     console.log(id);
//     try {
//         const note = Note.get(id);
//         res.json(note);
//     } catch (error) {
//         next(error);
//     }
// });


router.get('/', async (req, res, next) => {
    
    try {
        const notes = await Post.find();
        res.json(notes);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
     console.log(req.params.id);
    try {
        const note = await Post.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (error) {
        next(error);
    }
});

// CREATE MEMO MDB
router.post('/', async (req, res, next) => {
    const { author, title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    try {
        const note = await Post.create(
            {
                author: author,
                title: title,
                content: content,
            });
        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
});

// PUT TANPA MDB
// router.put('/:id', (req, res, next) => {
//     const id = Number(req.params.id);
//     const { title, content } = req.body;

//     try {
//         const note = Note.update(id, title, content);
//         res.json(note);
//     } catch (error) {
//         next(error);
//     }
// });

//UPDATE MDB
router.put('/:id', async (req, res, next) => {
    const { author, title, content } = req.body;

    try {
        const note = await Post.findByIdAndUpdate(req.params.id, 
            { title, content }, 
            { new: true });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (error) {
        next(error);
    }
});

// DELETE TANPA MDB
// router.delete('/:id', (req, res, next) => {
//     const id = Number(req.params.id);
//     try {
//         Note.remove(id);
//         res.json({ message: 'Note deleted successfully' });
//     } catch (error) {
//         next(error);
//     }
// });

//DELETE MDB
router.delete('/:id', async (req, res, next) => {
    const id = Number(req.params.id);
    try {
        const note = await Post.findByIdAndDelete(req.params.id);
        if(!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        next(error);
    }
});



export default router;