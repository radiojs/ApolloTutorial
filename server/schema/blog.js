import { gql } from 'apollo-server';

const typeDefs = gql`
    type Blog {
        _id: ID!
        title: String
    }

    type Query {
        blogList: [Blog]
    }
`;

export default typeDefs;

