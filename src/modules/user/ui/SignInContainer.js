import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { setAuthToken } from '../../../lib/auth';
import { SIGN_IN } from '../apollo/queries';
import SignIn from './SignIn';

const SignInContainer = withRouter(({ history, location }) => {
    return (
        <Mutation mutation={SIGN_IN}>
            {(signIn, { loading, data, error }) => {
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
                                if (location && location.state && location.state.from) {
                                    document.location.replace(location.state.from.pathname);
                                } else {
                                    document.location.replace('/');
                                }
                            }
                        }}
                    />
                )
            }}
        </Mutation>
    );
});

export default SignInContainer;
