import _ from 'lodash';

import BlogResolver from './blog';
import UserResolver from './user';

const resolvers = _.merge({},
    BlogResolver,
    UserResolver,
);

export default resolvers;

