import gql from 'graphql-tag';

const ME_VIEW = gql`
  query MeView {
    meView {
      _id
      email
      createdAt
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUp($email: String, $password: String) {
    signUp(email: $email, password: $password) {
      token
    }
  }
`;

const SIGN_IN = gql`
  mutation SignIn($email: String, $password: String) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export {
    ME_VIEW,
    SIGN_UP,
    SIGN_IN,
};
