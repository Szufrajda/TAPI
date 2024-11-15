import fs from 'fs';
import perfumesData from '../data/perfumes.json' assert { type: "json" };

let perfumes = perfumesData.perfumy;

const generateHATEOASLinks = (perfume) => {
    const id = perfume.id;
    return {
        self: `/perfumy/${id}`,
        update: `/perfumy/${id}`,
        delete: `/perfumy/${id}`,
        allPerfumes: `/perfumy`
    };
};

export const getAllPerfumes = (req, res) => {
    const perfumesWithLinks = perfumes.map(perfume => ({
        id: perfume.id,
        nazwa: perfume.nazwa,
        marka: perfume.marka,
        links: generateHATEOASLinks(perfume)
    }));
    res.json(perfumesWithLinks);
};

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

export const createPerfume = (req, res) => {
    const newPerfume = {
        id: perfumes.length + 1,
        ...req.body
    };

    perfumes.push(newPerfume);
    fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));

    const perfumeWithLinks = {
        id: newPerfume.id,
        nazwa: newPerfume.nazwa,
        marka: newPerfume.marka,
        links: generateHATEOASLinks(newPerfume)
    };
    
    res.status(201).json(perfumeWithLinks);
};

export const updatePerfume = (req, res) => {
    const id = Number(req.params.id);
    const perfume = perfumes.find(p => p.id === id);

    if (perfume) {
        Object.assign(perfume, req.body);
        fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));
        const perfumeWithLinks = {
            id: perfume.id,
            nazwa: perfume.nazwa,
            marka: perfume.marka,
            links: generateHATEOASLinks(perfume)
        };
        res.json(perfumeWithLinks);
    } else {
        res.status(404).json({ message: "Nie znaleziono perfumu" });
    }
};

export const replacePerfume = (req, res) => {
    const id = Number(req.params.id);
    const index = perfumes.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Nie znaleziono perfumu" });
    }

    perfumes[index] = { id, ...req.body };
    fs.writeFileSync('data/perfumes.json', JSON.stringify({ perfumy: perfumes }, null, 2));  
    const perfumeWithLinks = {
        id: perfumes[index].id,
        nazwa: perfumes[index].nazwa,
        marka: perfumes[index].marka,
        links: generateHATEOASLinks(perfumes[index])
    };
    res.json(perfumeWithLinks);
};

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
