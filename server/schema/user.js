import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        _id: ID!
        email: String
        password: String
        name: String
        createdAt: Date
    }

    type UserToken {
        user: User
        token: String
    }

    extend type Query {
        meView: User
    }

    extend type Mutation {
        signUp(email: String, password: String): UserToken
        signIn(email: String, password: String): UserToken
    }
`;

export default typeDefs;

