import React from 'react';
import { Mutation } from 'react-apollo';

import { setAuthToken } from '../../../lib/auth';
import { SIGN_UP } from '../apollo/queries';
import SignUp from './SignUp';

const SignUpContainer = () => {
  return (
    <Mutation mutation={SIGN_UP}>
      {(signUp, { loading, data, error }) => {
        return (
          <SignUp
            loading={loading}
            data={data}
            error={error}
            onSubmit={async (variables) => {
              const result = await signUp({ variables });
              if (result && result.data && result.data.signUp) {
                const token = result.data.signUp.token;
                setAuthToken(token);
                document.location.replace('/');
              }
            }}
          />
        )
      }}
    </Mutation>
  );
};

export default SignUpContainer;
