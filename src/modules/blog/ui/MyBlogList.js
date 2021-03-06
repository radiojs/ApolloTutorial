import React from 'react';
import { Button, Spinner } from 'radio-ui';

import Page from '../../../components/layout/Page';
import MyBlogNewContainer from './MyBlogNewContainer';

class MyBlogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modalBlogNew: false };
    }

    toggleBlogNew = () => {
        this.setState({ modalBlogNew: !this.state.modalBlogNew });
    }

    handleBlogNewDone = () => {
        this.setState({ modalBlogNew: !this.state.modalBlogNew });
        this.props.onRefresh();
    }

    render() {
        const { loading, data, error } = this.props;
        const { modalBlogNew } = this.state;

        if (loading) return <Spinner />;

        return (
            <Page title="MyBlogList">
                <div>
                    <Button onClick={this.toggleBlogNew}>등록</Button>
                </div>
                {error ? (
                    <p>Error: check server connection</p>
                ) : (
                    data.blogs && data.blogs.map(doc => (
                        <p key={doc._id}>{doc.title}</p>
                    ))
                )}
                <MyBlogNewContainer
                    key={modalBlogNew}
                    show={modalBlogNew}
                    onClose={this.toggleBlogNew}
                    onDone={this.handleBlogNewDone}
                />
            </Page>
        );
    }
}

export default MyBlogList;
