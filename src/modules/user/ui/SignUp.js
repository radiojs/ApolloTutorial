import React from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Form, Spinner } from "radio-ui";

import Page from "../../../components/layout/Page";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.props.loading) return;

    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  };

  render() {
    const { loading, onSignIn } = this.props;
    const { email, password } = this.state;

    if (loading) return <Spinner />;

    return (
      <Page>
        <Grid container justify="center">
          <Grid item md={4}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Form onSubmit={this.handleSubmit}>
              <TextField
                label="Email"
                name="email"
                value={email}
                fullWidth
                margin="normal"
                autoComplete="email"
                autoFocus
                onChange={e => {
                  this.handleChange("email", e);
                }}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                value={password}
                fullWidth
                margin="normal"
                autoComplete="current-password"
                onChange={e => {
                  this.handleChange("password", e);
                }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                회원가입
              </Button>
            </Form>
            <Button onClick={onSignIn}>Sign in</Button>
          </Grid>
        </Grid>
      </Page>
    );
  }
}

export default SignUp;
