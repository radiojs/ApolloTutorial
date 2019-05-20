import React from 'react';
import { Query, Mutation } from 'react-apollo';

import {
  TOAST_LIST,
  TOAST_REMOVE,
} from '../apollo/queries';
import ToastList from './ToastList';

const ToastListContainer = () => (
  <Query query={TOAST_LIST} ssr={false}>
    {({ data, client }) => {
      return (
        <Mutation mutation={TOAST_REMOVE}>
          {(removeToast, args) => (
            <ToastList
              toasts={data && data.toasts}
              onClose={(_id) => {
                removeToast({
                  variables: { _id },
                });
              }}
            />
          )}
        </Mutation>
      );
    }}
  </Query>
);

export default ToastListContainer;
