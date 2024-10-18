import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Perfume {
        id: ID!
        nazwa: String!
        marka: String!
        nuty_zapachowe: [ScentNote!]!
        opakowanie: Packaging!
    }

    type ScentNote {
        typ: String!
        skladniki: [ScentIngredient]
    }

    type ScentIngredient {
        nazwa_skladnika: String
        grupa_zapachowa: String
    }

    type Packaging {
        pojemnosc_ml: Int
        cena: String!
    }

    type Query {
        getAllPerfumes: [Perfume!]!
        getPerfumeById(id: ID!): Perfume
    }

    type Mutation {
        createPerfume(
            nazwa: String!,
            marka: String!,
            nuty_zapachowe: [ScentNoteInput!]!,
            opakowanie: PackagingInput!
        ): Perfume

        updatePerfume(
            id: ID!,
            nazwa: String,
            marka: String,
            nuty_zapachowe: [ScentNoteInput!],
            opakowanie: PackagingInput
        ): Perfume

        deletePerfume(id: ID!): Perfume
    }

    input ScentNoteInput {
        typ: String!
        skladniki: [ScentIngredientInput]
    }

    input ScentIngredientInput {
        nazwa_skladnika: String
        grupa_zapachowa: String
    }

    input PackagingInput {
        pojemnosc_ml: Int
        cena: String!
    }
`;

export default typeDefs;
