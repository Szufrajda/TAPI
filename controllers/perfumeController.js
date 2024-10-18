import fs from 'fs';

// Wczytajmy dane z pliku JSON
let perfumesData = JSON.parse(fs.readFileSync('data/perfumes.json', 'utf-8'));

// Odwołanie do tablicy perfum
let perfumes = perfumesData.perfumy;

// Pobranie wszystkich perfum
export const getAllPerfumes = (req, res) => {
    res.json(perfumes);
};

// Pobranie perfum po ID
export const getPerfumeById = (req, res) => {
    const id = Number(req.params.id);
    const perfume = perfumes.find(p => p.id === id);

    if (perfume) {
        res.json(perfume);
    } else {
        res.status(404).json({ message: "Nie znaleziono perfumu" });
    }
};

// Dodanie nowych perfum
export const createPerfume = (req, res) => {
    const newPerfume = req.body;
    newPerfume.id = perfumes.length + 1;  // Generujemy nowe ID

    perfumes.push(newPerfume);
    // Zapisujemy zmiany do pliku JSON
    fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));
    res.status(201).json(newPerfume);
};

// Aktualizacja istniejących perfum (częściowa aktualizacja - PATCH)
export const updatePerfume = (req, res) => {
    const id = Number(req.params.id);
    const perfume = perfumes.find(p => p.id === id);

    if (perfume) {
        Object.assign(perfume, req.body);
        fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));
        res.json(perfume);
    } else {
        res.status(404).json({ message: "Nie znaleziono perfumu" });
    }
};

// Zastąpienie istniejących perfum (pełna aktualizacja - PUT)
export const replacePerfume = (req, res) => {
    const id = parseInt(req.params.id);
    const index = perfumes.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Nie znaleziono perfumu" });
    }

    perfumes[index] = { id, ...req.body };
    fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));  
    res.json(perfumes[index]);
};

// Usunięcie perfum po ID
export const deletePerfume = (req, res) => {
    const id = Number(req.params.id);
    const index = perfumes.findIndex(p => p.id === id);

    if (index !== -1) {
        perfumes.splice(index, 1);
        fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));  
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Nie znaleziono perfumu" });
    }
};
