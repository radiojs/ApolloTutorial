import React from 'react';
import { Query } from 'react-apollo';

import { BLOG_LIST } from '../apollo/queries';

import BlogList from './BlogList';

const BlogListContainer = () => {
    return (
        <Query query={BLOG_LIST}>
            {({ loading, data, error }) => {
                const blogs = data && data.blogList;
                return (
                    <BlogList
                        loading={loading}
                        data={{ blogs }}
                        error={error}
                    />
                )
            }}
        </Query>
    );
};

/*
class BlogListContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            loading: false,
            data: {},
            error: null,
        };
    }

    async componentDidMount() {
        this.setState({ loading: true, error: null });
        try {
            const result = await fetch('/api/blogs');
            if (result) {
                const json = await result.json();
                if (json.blogs) {
                    this.setState({
                        loading: false,
                        data: {
                            blogs: json.blogs,
                        },
                    });
                }
            }
        } catch (ex) {
            this.setState({ loading: false, error: 'error_fetch' });
        }
    }

    render() {
        const { loading, data, error } = this.state;

        return (
            <BlogList loading={loading} data={data} error={error} />
        )
    }
}
*/
export default BlogListContainer;
