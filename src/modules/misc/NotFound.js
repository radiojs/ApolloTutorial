import React from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/layout/Page';

class NotFound extends React.Component {
    render() {
        return (
            <Page title="NotFound">
                <h1>Path Not Found</h1>
                <p><Link to="/">Move to Home</Link></p>
            </Page>
        );
    }
}

export default NotFound;
