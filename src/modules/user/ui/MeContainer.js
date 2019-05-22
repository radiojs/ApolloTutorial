import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import Me from './Me';
import { ME_VIEW } from '../apollo/queries';
import { clearAuthToken } from '../../../lib/auth';

const MeContainer = withRouter(({ onSignOut }) => {
  return (
    <Query query={ME_VIEW} fetchPolicy={'network-only'}>
      {({ loading, error, data, refetch }) => (
        <Me
          loading={loading}
          error={error}
          data={data}
          onSignOut={(confirm) => {
            if (confirm) {
              clearAuthToken();
              refetch();
              // document.location.replace('/');
            }
            onSignOut && onSignOut();
          }}
        />
      )}
    </Query>
  );
});


export default MeContainer;
