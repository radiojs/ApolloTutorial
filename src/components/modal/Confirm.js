import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Confirm = ({ open, title, message, onAnswer }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={() => {
      onAnswer(false);
    }}
    aria-labelledby="confirm-dialog-slide-title"
    aria-describedby="confirm-dialog-slide-description"
  >
    <DialogTitle id="confirm-dialog-slide-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-slide-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          onAnswer(false);
        }}
        color="primary"
      >
        No
      </Button>
      <Button
        onClick={() => {
          onAnswer(true);
        }}
        color="primary"
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

export default Confirm;
