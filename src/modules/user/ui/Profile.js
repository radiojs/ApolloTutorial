import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Spinner } from 'radio-ui';

import Page from '../../../components/layout/Page';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = { confirm: false };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  handleSignOut() {
    this.setState({ confirm: true });
  }

  handleConfirm(confirm) {
    this.setState({ confirm: false });
    this.props.onSignOut(confirm);
  }

  renderContent() {
    const { loading, error, data } = this.props;
    if (loading) return <Spinner />;
    if (error) {
      console.log('error', error);
      return <p>Error :(</p>;
    }

    const { meView } = data || {};
    const email = meView && meView.email;

    return email ? (
      <div className="Profile">
        <Link to="/my-profile"><p>{email}</p></Link>
        <Button className="icon" onClick={this.handleSignOut}>
          <Icon name="signOut" /><span>Sign out</span>
        </Button>
      </div>
    ) : (
      <div className="Profile">
        <Link to="/sign-in"><p>Sign in</p></Link>
      </div>
    );
  }

  render() {
    return (
      <Page title="My profile">
        {this.renderContent()}
      </Page>
    );
  }
}

export default Profile;
