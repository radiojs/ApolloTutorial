import React from 'react';
import { Query } from 'react-apollo';

import { MY_BLOG_LIST } from '../apollo/queries';

import MyBlogList from './MyBlogList';

const MyBlogListContainer = () => {
    return (
        <Query query={MY_BLOG_LIST}>
            {({ loading, data, error, refetch }) => {
                const blogs = data && data.blogList;
                console.log('blogs data', data);
                return (
                    <MyBlogList
                        loading={loading}
                        data={{ blogs }}
                        error={error}
                        onRefresh={() => {
                            refetch();
                        }}
                    />
                )
            }}
        </Query>
    );
};

export default MyBlogListContainer;
