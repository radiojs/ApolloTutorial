import Blog from '../datasource/blog';

const resolvers = {
    Query: {
        async blogList() {
            const blogs =  Blog.find().exec();

            return blogs;
        }
    },

    Mutation: {
        async myBlogNew(root, { title }) {
            const object = { title };
            const blog = new Blog(object);
            const result = await blog.save();

            object._id = result._id;

            return object;
        }
    }
};

export default resolvers;
