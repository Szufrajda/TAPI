import fs from 'fs';
import perfumesData from '../data/perfumes.json' assert { type: "json" };

let scentNotes = perfumesData.nuty_zapachowe;

export const getAllScentNotes = (req, res) => {
    res.json(scentNotes);
};

export const getScentNoteById = (req, res) => {
    const id = Number(req.params.id);
    const scentNote = scentNotes.find(note => note.id === id);

    if (scentNote) {
        res.json(scentNote);
    } else {
        res.status(404).json({ message: "Nie znaleziono nuty zapachowej" });
    }
};

export const createScentNote = (req, res) => {
    const newNote = {
        id: scentNotes.length + 1,
        ...req.body
    };

    scentNotes.push(newNote);
    fs.writeFileSync('data/perfumes.json', JSON.stringify({ ...perfumesData, nuty_zapachowe: scentNotes }, null, 2));
    res.status(201).json(newNote);
};

export const updateScentNote = (req, res) => {
    const id = Number(req.params.id);
    const note = scentNotes.find(note => note.id === id);

    if (note) {
        Object.assign(note, req.body);
        fs.writeFileSync('data/perfumes.json', JSON.stringify({ ...perfumesData, nuty_zapachowe: scentNotes }, null, 2));
        res.json(note);
    } else {
        res.status(404).json({ message: "Nie znaleziono nuty zapachowej" });
    }
};

export const deleteScentNote = (req, res) => {
    const id = Number(req.params.id);
    const index = scentNotes.findIndex(note => note.id === id);

    if (index !== -1) {
        scentNotes.splice(index, 1);
        fs.writeFileSync('data/perfumes.json', JSON.stringify({ ...perfumesData, nuty_zapachowe: scentNotes }, null, 2));
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Nie znaleziono nuty zapachowej" });
    }
};
