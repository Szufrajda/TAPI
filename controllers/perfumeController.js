import fs from 'fs';

// Wczytajmy dane z pliku JSON
let perfumesData = JSON.parse(fs.readFileSync('data/perfumes.json', 'utf-8'));

// Odwołanie do tablicy perfum
let perfumes = perfumesData.perfumy;

// Helper do generowania linków HATEOAS
const generateHATEOASLinks = (perfume) => {
    const id = perfume.id;
    return {
        self: `/perfumy/${id}`,
        update: `/perfumy/${id}`,
        delete: `/perfumy/${id}`,
        allPerfumes: `/perfumy`
    };
};

// Pobranie wszystkich perfum
export const getAllPerfumes = (req, res) => {
    const perfumesWithLinks = perfumes.map(perfume => ({
        ...perfume,
        links: generateHATEOASLinks(perfume)
    }));
    res.json(perfumesWithLinks);
};

// Pobranie perfum po ID
export const getPerfumeById = (req, res) => {
    const id = Number(req.params.id);
    const perfume = perfumes.find(p => p.id === id);

    if (perfume) {
        const perfumeWithLinks = {
            ...perfume,
            links: generateHATEOASLinks(perfume)
        };
        res.json(perfumeWithLinks);
    } else {
        res.status(404).json({ message: "Nie znaleziono perfumu" });
    }
};

// Pobranie perfum po nutach zapachowych (typ i grupa)
export const getPerfumesByScentNoteTypeAndGroup = (req, res) => {
    const { typ, grupa } = req.params;

    const filteredPerfumes = perfumes.filter(perfume => 
        perfume.nuty_zapachowe.some(note => 
            note.typ === typ && 
            note.składniki.some(skladnik => skladnik.grupa_zapachowa === grupa)
        )
    );

    if (filteredPerfumes.length > 0) {
        const perfumesWithLinks = filteredPerfumes.map(perfume => ({
            ...perfume,
            links: generateHATEOASLinks(perfume)
        }));
        res.json(perfumesWithLinks);
    } else {
        res.status(404).json({ message: `Nie znaleziono perfum z nutami zapachowymi typu ${typ} i grupy ${grupa}` });
    }
};

// Dodanie nowych perfum
export const createPerfume = (req, res) => {
    const newPerfume = req.body;
    newPerfume.id = perfumes.length + 1;  // Generujemy nowe ID

    perfumes.push(newPerfume);
    // Zapisujemy zmiany do pliku JSON
    fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));
    const perfumeWithLinks = {
        ...newPerfume,
        links: generateHATEOASLinks(newPerfume)
    };
    res.status(201).json(perfumeWithLinks);
};

// Aktualizacja istniejących perfum (częściowa aktualizacja - PATCH)
export const updatePerfume = (req, res) => {
    const id = Number(req.params.id);
    const perfume = perfumes.find(p => p.id === id);

    if (perfume) {
        Object.assign(perfume, req.body);
        fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));
        const perfumeWithLinks = {
            ...perfume,
            links: generateHATEOASLinks(perfume)
        };
        res.json(perfumeWithLinks);
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
    const perfumeWithLinks = {
        ...perfumes[index],
        links: generateHATEOASLinks(perfumes[index])
    };
    res.json(perfumeWithLinks);
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
