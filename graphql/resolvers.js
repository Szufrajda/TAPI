// Importujemy dane JSON z asercją
import perfumesData from '../data/perfumes.json' assert { type: "json" };

let perfumes = perfumesData.perfumy;

const resolvers = {
    Query: {
        getAllPerfumes: () => perfumes,
        getPerfumeById: (parent, args) => perfumes.find(p => p.id === parseInt(args.id)),
    },
    Mutation: {
        createPerfume: (parent, args) => {
            const newPerfume = { id: perfumes.length + 1, ...args };
            perfumes.push(newPerfume);
            return newPerfume;
        },
        updatePerfume: (parent, args) => {
            const perfumeIndex = perfumes.findIndex(p => p.id === parseInt(args.id));
            if (perfumeIndex === -1) return null;

            const updatedPerfume = { ...perfumes[perfumeIndex], ...args };
            perfumes[perfumeIndex] = updatedPerfume;
            return updatedPerfume;
        },
        deletePerfume: (parent, args) => {
            const perfumeIndex = perfumes.findIndex(p => p.id === parseInt(args.id));
            if (perfumeIndex === -1) return null;

            const deletedPerfume = perfumes[perfumeIndex];
            perfumes = perfumes.filter(p => p.id !== parseInt(args.id));
            return deletedPerfume;
        }
    }
};

export default resolvers;
