import React from 'react';
import { Link } from 'react-router-dom';

class Layout extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className="Layout">
                <nav>
                    <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/blogs">Blog list</Link></li>
                    </ul>
                </nav>
                {children}
            </div>
        )
    }
}

export default Layout;
