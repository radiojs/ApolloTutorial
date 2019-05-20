import { gql } from 'apollo-server';

const typeDefs = gql`
    type Blog {
        _id: ID!
        title: String
    }

    extend type Query {
        blogList: [Blog]
    }

    extend type Mutation {
        myBlogNew(title: String): Blog
    }
`;

export default typeDefs;

