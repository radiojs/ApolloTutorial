import React from 'react';
import { Query } from 'react-apollo';

import { BLOG_LIST } from '../apollo/queries';

import BlogList from './BlogList';

const BlogListContainer = () => {
    return (
        <Query query={BLOG_LIST}>
            {({ loading, data, error, refetch }) => {
                const blogs = data && data.blogList;
                return (
                    <BlogList
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

export default BlogListContainer;
