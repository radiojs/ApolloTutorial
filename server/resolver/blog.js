const blogs = [{
    _id: 1,
    title: 'Seoul',
}, {
    _id: 2,
    title: 'New York',
}, {
    _id: 3,
    title: 'London',
}, {
    _id: 4,
    title: 'Paris',
}];

const resolvers = {
    Query: {
        blogList() {
            return blogs;
        }
    },

    Mutation: {
        myBlogNew(root, { title }) {
            console.log('title', title);
            blogs.push({ 
                _id: blogs.length + 1,
                title,
            });

            return blogs[blogs.length - 1];
        }
    }
};

export default resolvers;
