import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Confirm, Icon, Spinner } from 'radio-ui';

class Me extends React.Component {

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
    console.log('meView', meView);
    const email = meView && meView.email;

    return email ? (
      <React.Fragment>
        <Link to="/profile"><p>{email}</p></Link>
        <Button className="icon" onClick={this.handleSignOut}>
          <Icon name="signOut" /><span>Sign out</span>
        </Button>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Link to="/sign-in">Sign in</Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="Me">
        {this.renderContent()}
        <Confirm
          show={this.state.confirm}
          message={'confirm_sign_out'}
          buttons={[{
            title: 'no',
          }, {
            title: 'yes',
            style: 'primary',
          }]}
          onAnswer={this.handleConfirm}
        />
      </div>
    );
  }
}

export default Me;
