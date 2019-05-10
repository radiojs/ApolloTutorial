import React from 'react';

import Page from '../../../components/layout/Page';

const BlogList = ({ loading, data, error }) => (
    <Page title="BlogList">
        <h1>Blog list</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (error ? (
            <p>Error: check server connection</p>
        ) : (
            data.blogs && data.blogs.map(doc => (
                <p key={doc._id}>{doc.title}</p>
            ))
        ))}
    </Page>
);

export default BlogList;
