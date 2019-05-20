import React from 'react';
import { Query } from 'react-apollo';

import Profile from './Profile';
import { ME_VIEW } from '../apollo/queries';
import { clearAuthToken } from '../../../lib/auth';

const ProfileContainer = ({ onSignOut }) => {
  return (
    <Query query={ME_VIEW} fetchPolicy={'network-only'}>
      {({ loading, error, data }) => (
        <Profile
          loading={loading}
          error={error}
          data={data}
          onSignOut={(confirm) => {
            if (confirm) {
              clearAuthToken();
              document.location.reload(true);
            }
            onSignOut && onSignOut();
          }}
        />
      )}
    </Query>
  );
};


export default ProfileContainer;
