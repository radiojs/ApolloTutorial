import gql from 'graphql-tag';

const BLOG_LIST = gql`
  query BlogList {
    blogList {
      _id
      title
    }
  }
`;

export {
    BLOG_LIST,
};
