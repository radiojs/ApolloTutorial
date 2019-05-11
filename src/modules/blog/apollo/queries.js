import gql from 'graphql-tag';

const BLOG_LIST = gql`
  query BlogList {
    blogList {
      _id
      title
    }
  }
`;

const MY_BLOG_NEW = gql`
  mutation MyBlogNew($title: String) {
    myBlogNew(title: $title) {
      _id
      title
    }
  }
`;

export {
    BLOG_LIST,
    MY_BLOG_NEW,
};
