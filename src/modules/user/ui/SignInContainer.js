import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import { setAuthToken } from "../../../lib/auth";
import { TOAST_ADD } from "../../toast/apollo/queries";
import { SIGN_IN } from "../apollo/queries";
import SignIn from "./SignIn";

const SignInContainer = withRouter(({ history, location }) => {
  return (
    <Mutation mutation={SIGN_IN}>
      {(signIn, { loading, data, error, client }) => {
        return (
          <SignIn
            loading={loading}
            data={data}
            error={error}
            onSubmit={async variables => {
              const result = await signIn({ variables });
              if (result && result.data && result.data.signIn) {
                const token = result.data.signIn.token;
                setAuthToken(token);

                client.mutate({
                  mutation: TOAST_ADD,
                  variables: {
                    icon: "check",
                    message: "Sign in succeded."
                  }
                });

                if (location && location.state && location.state.from) {
                  // document.location.replace(location.state.from.pathname);
                  history.replace(location.state.from.pathname);
                } else {
                  // document.location.replace('/');
                  history.replace("/");
                }
              }
            }}
            onSignUp={() => {
              history.push("/sign-up");
            }}
          />
        );
      }}
    </Mutation>
  );
});

export default SignInContainer;
