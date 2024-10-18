import perfumes from '../data/perfumes.json' assert { type: 'json' };

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
    newPerfume.id = perfumes.length + 1;

    perfumes.push(newPerfume);
    res.status(201).json(newPerfume);
};

// Aktualizacja istniejących perfum (pełna lub częściowa)
export const updatePerfume = (req, res) => {
    const id = Number(req.params.id);
    const perfume = perfumes.find(p => p.id === id);

    if (perfume) {
        Object.assign(perfume, req.body);
        res.json(perfume);
    } else {
        res.status(404).json({ message: "Nie znaleziono perfumu" });
    }
};

    // Replace an existing perfume by ID (PUT /api/perfumes/:id)
export const replacePerfume = (req, res) => {
    const id = parseInt(req.params.id);
    const index = perfumes.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Nie znaleziono perfumu" });
    }

    perfumes[index] = { id, ...req.body };
    res.json(perfumes[index]);
};

// Usunięcie perfum po ID
export const deletePerfume = (req, res) => {
    const id = Number(req.params.id);
    const index = perfumes.findIndex(p => p.id === id);

    if (index !== -1) {
        perfumes.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Nie znaleziono perfumu" });
    }
};


