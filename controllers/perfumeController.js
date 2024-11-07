import fs from 'fs';
import perfumesData from '../data/perfumes.json' assert { type: "json" };

let perfumes = perfumesData.perfumy;

const generateHATEOASLinks = (perfume) => {
    const id = perfume.id;
    return {
        self: `/perfumy?id=${id}`,
        update: `/perfumy?id=${id}`,
        delete: `/perfumy?id=${id}`,
        allPerfumes: `/perfumy`
    };
};

export const getAllPerfumes = (req, res) => {
    const id = req.query.id ? Number(req.query.id) : null;

    if (id) {
        // Jeśli parametr `id` jest obecny, znajdź pojedynczy perfum
        const perfume = perfumes.find(p => p.id === id);
        if (perfume) {
            const perfumeWithLinks = {
                ...perfume,
                links: generateHATEOASLinks(perfume)
            };
            return res.json(perfumeWithLinks);
        } else {
            return res.status(404).json({ message: "Nie znaleziono perfumu" });
        }
    }

    // Jeśli brak parametru `id`, zwróć wszystkie perfumy
    const perfumesWithLinks = perfumes.map(perfume => ({
        ...perfume,
        links: generateHATEOASLinks(perfume)
    }));
    res.json(perfumesWithLinks);
};


export const getPerfumeById = (req, res) => {
    const id = Number(req.query.id);
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


export const getPerfumesByScentNoteTypeAndGroup = (req, res) => {
    const { typ, grupa } = req.query;

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

export const createPerfume = (req, res) => {
    const newPerfume = {
        id: perfumes.length + 1,
        ...req.body
    };

    perfumes.push(newPerfume);
    fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));

    const perfumeWithLinks = {
        ...newPerfume,
        links: generateHATEOASLinks(newPerfume)
    };
    
    res.status(201).json(perfumeWithLinks);
};


export const updatePerfume = (req, res) => {
    const id = Number(req.query.id);
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


export const replacePerfume = (req, res) => {
    const id = parseInt(req.query.id);
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


export const deletePerfume = (req, res) => {
    const id = Number(req.query.id);
    const index = perfumes.findIndex(p => p.id === id);

    if (index !== -1) {
        perfumes.splice(index, 1);
        fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));  
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Nie znaleziono perfumu" });
    }
};
