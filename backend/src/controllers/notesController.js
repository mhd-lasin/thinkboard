import Note from "../models/Note.js";

export const getNotes = async(req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json(notes);
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({ error: error.message });
    }
}

export const getNote = async(req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        return res.status(200).json(note);
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({ error: error.message });
    }
}

export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        
        // Logging the body to help debug why validation might fail
        console.log("POST /api/notes - Body:", req.body);

        if (!title || !content) {
            return res.status(400).json({ error: "Please provide title and content" });
        }
        const note = await Note.create({title, content});
        return res.status(201).json(note);
    } catch (error) {
        console.error("Error creating note:", error.message);
        return res.status(500).json({ error: error.message });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error.message);
        return res.status(500).json({ error: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error("Error deleting note:", error.message);
        return res.status(500).json({ error: error.message });
    }
}

