const resolvers = {
    Query: {
        blogList() {
            return [{
                _id: 1,
                title: 'Seoul',
            }, {
                _id: 2,
                title: 'Tokyo',
            }, {
                _id: 3,
                title: 'London',
            }, {
                _id: 4,
                title: 'Paris',
            }];
        }
    }
};

export default resolvers;
