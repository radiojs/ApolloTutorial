import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorDetails: null };
    }

    componentDidCatch(error, errorDetails) {
        this.setState({ error, errorDetails });
    }

    handleClick = () => {
        this.setState({ error: null, errorDetails: null });
    }

    render() {
        const { error, errorDetails } = this.state;

        if (error) {
            return (
                <div className="error">
                    <h1>Error </h1>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {error && error.toString()}
                        <br />
                        {errorDetails && errorDetails.componentStack}
                    </details>
                    <p><Link to="/" onClick={this.handleClick}>Move to Home</Link></p>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
