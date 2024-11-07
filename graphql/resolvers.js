import perfumesData from '../data/perfumes.json' assert { type: "json" };

let perfumes = perfumesData.perfumy;

const resolvers = {
    Query: {
        getAllPerfumes: () => {
            return perfumes.map(perfume => ({
                ...perfume,
                nuty_zapachowe: perfume.nuty_zapachowe.map(note => ({
                    ...note,
                    skladniki: note.składniki || []
                }))
            }));
        },
        getPerfumeById: (parent, args) => {
            const perfume = perfumes.find(p => p.id === parseInt(args.id));
            if (!perfume) return null;

            return {
                ...perfume,
                nuty_zapachowe: perfume.nuty_zapachowe.map(note => ({
                    ...note,
                    skladniki: note.składniki || []
                }))
            };
        }
    },
    Mutation: {
        createPerfume: (parent, args) => {
            const newPerfume = { id: perfumes.length + 1, ...args };
            perfumes.push(newPerfume);
            return {
                ...newPerfume,
                nuty_zapachowe: newPerfume.nuty_zapachowe.map(note => ({
                    ...note,
                    skladniki: note.składniki || []
                }))
            };
        },
        updatePerfume: (parent, args) => {
            const perfumeIndex = perfumes.findIndex(p => p.id === parseInt(args.id));
            if (perfumeIndex === -1) return null;

            const updatedPerfume = { ...perfumes[perfumeIndex], ...args };
            perfumes[perfumeIndex] = updatedPerfume;

            return {
                ...updatedPerfume,
                nuty_zapachowe: updatedPerfume.nuty_zapachowe.map(note => ({
                    ...note,
                    skladniki: note.składniki || []
                }))
            };
        },
        deletePerfume: (parent, args) => {
            const perfumeIndex = perfumes.findIndex(p => p.id === parseInt(args.id));
            if (perfumeIndex === -1) return null;

            const deletedPerfume = perfumes[perfumeIndex];
            perfumes = perfumes.filter(p => p.id !== parseInt(args.id));
            return {
                ...deletedPerfume,
                nuty_zapachowe: deletedPerfume.nuty_zapachowe.map(note => ({
                    ...note,
                    skladniki: note.składniki || []
                }))
            };
        }
    }
};

export default resolvers;
