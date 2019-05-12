import React from 'react';
import { Mutation } from 'react-apollo';

import { MY_BLOG_NEW } from '../apollo/queries';
import MyBlogNew from './MyBlogNew';

const MyBlogNewContainer = ({ show, onClose }) => {
    return (
        <Mutation mutation={MY_BLOG_NEW}>
            {(myBlogNew, { loading, data, error }) => {
                if (data && data.myBlogNew) {
                    setTimeout(() => { onClose(); }, 0);
                }

                return (
                    <MyBlogNew
                        show={show}
                        loading={loading}
                        data={data}
                        error={error}
                        onClose={onClose}
                        onSubmit={({ title }) => {
                            myBlogNew({ variables: { title } });
                        }}
                    />
                )
            }}
        </Mutation>
    );
};

export default MyBlogNewContainer;
