import React from 'react';
import { Mutation } from 'react-apollo';

import { MY_BLOG_NEW } from '../apollo/queries';

import MyBlogNew from './MyBlogNew';

const MyBlogNewContainer = ({ show, onClose }) => {
    return (
        <Mutation mutation={MY_BLOG_NEW}>
            {( myBlogNew, { loading, data, error }) => {
                console.log('data', data);
                return (
                    <MyBlogNew
                        show={show}
                        loading={loading}
                        data={data}
                        error={error}
                        onClose={onClose}
                        onSubmit={({ title }) => {
                            const variables = { title };
                            myBlogNew({ variables });
                        }}
                    />
                )
            }}
        </Mutation>
    );
};

export default MyBlogNewContainer;
