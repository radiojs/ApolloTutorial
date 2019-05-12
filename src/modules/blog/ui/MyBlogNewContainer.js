import React from 'react';
import { Mutation } from 'react-apollo';

import { MY_BLOG_NEW } from '../apollo/queries';
import MyBlogNew from './MyBlogNew';

const MyBlogNewContainer = ({ show, onClose, onDone }) => {
    return (
        <Mutation mutation={MY_BLOG_NEW}>
            {(myBlogNew, { loading, data, error }) => {
                return (
                    <MyBlogNew
                        show={show}
                        loading={loading}
                        data={data}
                        error={error}
                        onClose={onClose}
                        onSubmit={async ({ title }) => {
                            const result = await myBlogNew({ variables: { title } });
                            if (result && result.data && result.data.myBlogNew) {
                                onDone();
                            }
                        }}
                    />
                )
            }}
        </Mutation>
    );
};

export default MyBlogNewContainer;
