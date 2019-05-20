import React from 'react';
import { Mutation } from 'react-apollo';

import { setAuthToken } from '../../../lib/auth';
import { SIGN_IN } from '../apollo/queries';
import SignIn from './SignIn';

const SignInContainer = () => {
    return (
        <Mutation mutation={SIGN_IN}>
            {(signIn, { loading, data, error }) => {
                console.log('sign in success next', { loading, data });
                return (
                    <SignIn
                        loading={loading}
                        data={data}
                        error={error}
                        onSubmit={async (variables) => {
                            const result = await signIn({ variables });
                            if (result && result.data && result.data.signIn) {
                                const token = result.data.signIn.token;
                                setAuthToken(token);
                                document.location.reload(true);                                
                            }
                        }}
                    />
                )
            }}
        </Mutation>
    );
};

export default SignInContainer;
