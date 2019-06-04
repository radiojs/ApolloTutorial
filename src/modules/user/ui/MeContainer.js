import React from "react";
import { Query, Subscription } from "react-apollo";
import { withRouter } from "react-router-dom";

import Me from "./Me";
import { ME_VIEW, ON_SIGNED_IN } from "../apollo/queries";
import { clearAuthToken } from "../../../lib/auth";

const MeContainer = withRouter(({ history, onToggle, onSignOut }) => {
  return (
    <Query query={ME_VIEW} fetchPolicy={"network-only"}>
      {({ loading, error, data, refetch }) => (
        <Subscription subscription={ON_SIGNED_IN}>
          {args => {
            if (args && args.data && args.data.onSignedIn && data) {
              data.meView = args.data.onSignedIn;
            }
            return (
              <Me
                loading={loading}
                error={error}
                data={data}
                onClick={link => {
                  history.push(link);
                  onToggle();
                }}
                onSignOut={confirm => {
                  if (confirm) {
                    clearAuthToken();
                    refetch();
                  }
                  onSignOut && onSignOut();
                }}
              />
            );
          }}
        </Subscription>
      )}
    </Query>
  );
});

export default MeContainer;
