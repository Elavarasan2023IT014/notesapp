const Note = require('../models/Notes');

const createNote = async(req,res)=>{
    try{

        const {title,content} = req.body;

        if(!title || ! content)
        {
            return res.status(400).json({message:'Enter all the fields'})
        }

        const note = await Note.create({
            user:req.user.id,
            title,
            content
        });

        res.status(201).json({
            message:'Note Created Successfully',
            note:{
                id:note._id,
                title:note.title,
                content:note.content,
                createdAt:note.createdAt,
                updatedAt:note.updatedAt
            }
        });

    }catch(error){
        res.status(500).json({message:'Sever Eror',error:error.message});

    }
};

const getNotes = async ( req,res)=>{
    try{
            const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    
            res.status(200).json({
                message:"Notes Retrived Successfully",
                notes:notes.map(note=>({
                    id: note._id,
                    title: note.title,
                    content: note.content,
                    createdAt: note.createdAt,
                    updatedAt: note.updatedAt
                }))
            });

    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
        }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }

    res.status(200).json({
      message: 'Note retrieved successfully',
      note: {

        id: note._id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({ message: 'Please provide title or content to update' });
    }

    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }

    if (title) note.title = title;
    if (content) note.content = content;

    await note.save();

    res.status(200).json({
      message: 'Note updated successfully',
      note: {
        id: note._id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const searchNotes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query' });
    }

    const notes = await Note.find({
      user: req.user.id,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Search results retrieved successfully',
      notes: notes.map(note => ({
        id: note._id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {createNote,getNotes,getNoteById,updateNote,deleteNote,searchNotes};
