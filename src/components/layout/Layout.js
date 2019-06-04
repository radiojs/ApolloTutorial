import React from "react";
import { Container } from "@material-ui/core";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sidebarOn: false };
  }

  toggleSidebar = show => {
    const state = typeof show === "boolean" ? show : !this.state.sidebarOn;
    this.setState({ sidebarOn: state });
  };

  render() {
    const { children } = this.props;
    const { sidebarOn } = this.state;

    return (
      <div className="Layout">
        <Container fixed>
          <Navbar onToggleSidebar={this.toggleSidebar} />
          <Sidebar open={sidebarOn} onToggle={this.toggleSidebar} />
          {children}
        </Container>
      </div>
    );
  }
}

export default Layout;
