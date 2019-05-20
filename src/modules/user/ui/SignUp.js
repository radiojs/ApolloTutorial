import React from 'react';
import { Button, Form, Input, Spinner } from 'radio-ui';

import Page from '../../../components/layout/Page';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();        

        if (this.props.loading) return;

        const { email, password } = this.state;
        this.props.onSubmit({ email, password });
    }
    
    render() {
        const { loading } = this.props;
        const { email, password } = this.state;

        if (loading) return <Spinner />;

        return (
            <Page
                title="Sign up"
            >
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />

                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
            </Page>
        );
    }
}

export default SignUp;
