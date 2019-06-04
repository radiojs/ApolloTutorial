import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Home as HomeIcon,
  Info as AboutIcon,
  LibraryBooks as BlogsIcon
} from "@material-ui/icons";

import MeContainer from "../../modules/user/ui/MeContainer";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

const menu = [
  {
    title: "Home",
    link: "/",
    icon: <HomeIcon />
  },
  {
    title: "About",
    link: "/about",
    icon: <AboutIcon />
  },
  {
    title: "Blogs",
    link: "/blogs",
    icon: <BlogsIcon />
  }
];

class Sidebar extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  handleClick = (e, link) => {
    const { history, onToggle } = this.props;
    history.push(link);
    onToggle();
  };

  render() {
    const { classes, open, onToggle } = this.props;

    return (
      <div>
        <SwipeableDrawer open={open} onClose={onToggle} onOpen={onToggle}>
          <div className={classes.list}>
            <MeContainer onToggle={onToggle} onSignOut={onToggle} />
            <Divider />
            <List>
              {menu.map(item => (
                <ListItem
                  button
                  key={item.title}
                  onClick={e => {
                    this.handleClick(e, item.link);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
  open: false
};

export default withRouter(withStyles(styles)(Sidebar));
