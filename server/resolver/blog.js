import Blog from '../datasource/blog';

const resolvers = {
    Query: {
        blogList: async () => {
            const blogs =  await Blog.find().exec();

            return blogs;
        },

        myBlogList: async (root, args, context) => {
            // authentication
            const { user } = context || {};
            if (!user) return null;

            const blogs = await Blog.find({ 'writtenBy._id': user._id }).exec();
            return blogs;
        }
    },

    Mutation: {
        myBlogNew: async (root, { title }, context) => {
            // authentication
            const { user } = context || {};
            if (!user) return null;

            const object = { title };
            const blog = new Blog(object);
            const result = await blog.save();

            object._id = result._id;

            return object;
        }
    }
};

export default resolvers;
