import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Face as SignInIcon } from "@material-ui/icons";

import { Icon, Spinner } from "radio-ui";

import Confirm from "../../../components/modal/Confirm";

class Me extends React.Component {
  constructor(props) {
    super(props);

    this.state = { confirm: false };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  handleSignOut(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ confirm: true });
  }

  handleConfirm(confirm) {
    this.setState({ confirm: false });
    this.props.onSignOut(confirm);
  }

  renderContent() {
    const { loading, error, data, onClick } = this.props;
    if (loading) return <Spinner />;
    if (error) {
      console.log("error", error);
      return <p>Error :(</p>;
    }

    const { meView } = data || {};
    const email = meView && meView.email;

    return email ? (
      <List>
        <ListItem
          button
          onClick={() => {
            onClick("/my-profile");
          }}
        >
          <Avatar>
            <SignInIcon />
          </Avatar>
          <ListItemText>{email}</ListItemText>
        </ListItem>
      </List>
    ) : (
      <List>
        <ListItem
          button
          onClick={() => {
            onClick("/sign-in");
          }}
        >
          <ListItemIcon>
            <SignInIcon />
          </ListItemIcon>
          <ListItemText>Sign in</ListItemText>
        </ListItem>
      </List>
    );
  }

  render() {
    return (
      <div className="Me">
        {this.renderContent()}
        <Confirm
          open={this.state.confirm}
          title={"sign_out"}
          message={"confirm_sign_out"}
          buttons={[
            {
              title: "no"
            },
            {
              title: "yes",
              style: "primary"
            }
          ]}
          onAnswer={this.handleConfirm}
        />
      </div>
    );
  }
}

export default Me;
