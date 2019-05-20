import uuid from 'uuid/v1';
import _ from 'lodash';

import { TOAST_LIST } from './queries';

const resolvers = {
  Query: {
    toastList: (root, params, { cache }) => {
      const data = cache.readQuery({ query: TOAST_LIST });
      const { toasts } = data;
      return toasts;
    },
  },
  
  Mutation: {
    addToast: (root, { message, icon, closeAt }, { cache }) => {
      const { toasts } = cache.readQuery({ query: TOAST_LIST });

      const toast = {
        _id: uuid(),
        message,
        icon,
        closeAt,
      };
      toasts.push(toast);
      const data = { toasts };

      cache.writeQuery({ query: TOAST_LIST, data });

      return toast;
    },

    removeToast: (root, { _id }, { cache }) => {
      let { toasts } = cache.readQuery({ query: TOAST_LIST });

      const index = _.findIndex(toasts, item => item._id === _id);
      if (index > -1) {
        toasts.splice(index, 1);
      }

      const data = { toasts };
      cache.writeQuery({ query: TOAST_LIST, data });

      return index > -1 ? 1: 0;
    },
  }
};

export default resolvers;
