import gql from 'graphql-tag';

const TOAST_LIST = gql`
  query ToastList {
    toasts @client
  }
`;

const TOAST_ADD = gql`
  mutation addToast($message: String, $icon: String, $closeAt: Int) {
    addToast(message: $message, icon: $icon, closeAt: $closeAt) @client
  }
`;

const TOAST_REMOVE = gql`
  mutation removeToast($_id: ID) {
    removeToast(_id: $_id) @client
  }
`;

export {
  TOAST_LIST,
  TOAST_ADD,
  TOAST_REMOVE,
};
