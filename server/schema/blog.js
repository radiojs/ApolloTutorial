import { gql } from 'apollo-server';

const typeDefs = gql`
    type Blog {
        _id: ID!
        title: String
        writtenBy: User
        createdAt: Date
        updatedAt: Date
    }

    extend type Query {
        blogList: [Blog]
        myBlogList: [Blog]
    }

    extend type Mutation {
        myBlogNew(title: String): Blog
    }
`;

export default typeDefs;

