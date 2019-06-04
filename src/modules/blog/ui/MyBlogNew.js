import React from "react";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { Form, Input, Spinner } from "radio-ui";

class MyBlogNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  handleChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    if (this.props.loading) return;

    e.preventDefault();
    this.props.onSubmit({ title: this.state.title });
  };

  render() {
    const { show, loading, onClose } = this.props;
    const { title } = this.state;

    if (loading) return <Spinner />;

    return (
      <Dialog open={show} title="BlogNew" fullScreen onClose={onClose}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Sound</Typography>
            <Button color="inherit" onClick={onClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Form onSubmit={this.handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={title}
            onChange={e => {
              this.handleChange("title", e);
            }}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Dialog>
    );
  }
}

export default MyBlogNew;
