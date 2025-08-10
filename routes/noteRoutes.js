const express = require('express');
const router = express.Router();
const {createNote,getNotes,getNoteById,updateNote,deleteNote,searchNotes} = require('../controllers/noteController');
const protect = require('../middleware/auth')


router.get('/search',protect,searchNotes);
router.post('/',protect,createNote);
router.get('/', protect, getNotes);
router.get('/:id',protect,getNoteById);
router.put('/update/:id',protect,updateNote);
router.delete('/:id',protect,deleteNote);



module.exports = router;