import React from 'react';
import { Button, Form, Input, Modal, Spinner } from 'radio-ui';

class MyBlogNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        this.props.onSubmit({ title: this.state.title });
    }
    
    render() {
        const { show, loading, onClose } = this.props;
        const { title } = this.state;

        if (loading) return <Spinner />;

        return (
            <Modal
                show={show}
                title="BlogNew"
                onClose={onClose}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </Form>
            </Modal>
        );
    }
}

export default MyBlogNew;
