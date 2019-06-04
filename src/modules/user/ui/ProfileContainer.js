import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";

import Profile from "./Profile";
import { ME_VIEW } from "../apollo/queries";
import { clearAuthToken } from "../../../lib/auth";

const ProfileContainer = ({ history, onSignOut }) => {
  return (
    <Query query={ME_VIEW} fetchPolicy={"network-only"}>
      {({ loading, error, data }) => (
        <Profile
          loading={loading}
          error={error}
          data={data}
          onSignOut={confirm => {
            if (confirm) {
              clearAuthToken();
              history.push("/");
            }
            onSignOut && onSignOut();
          }}
        />
      )}
    </Query>
  );
};

export default withRouter(ProfileContainer);
