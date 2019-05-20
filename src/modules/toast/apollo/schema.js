import gql from 'graphql-tag';

const typeDefs = gql`
  type ToastMessage {
    _id: ID!
    message: String
    icon: String
    closeAt: Int
  }

  extend type Query {
    toastList: [ToastMessage]
  }

  extend type Mutation {
    addToast(message: String, icon: String, closeAt: Int): ToastMessage
    removeToast(id: ID): Int
  }
`;

export default typeDefs;
