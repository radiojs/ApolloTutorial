import _ from 'lodash';

import BlogResolver from './user';
import UserResolver from './user';

const resolvers = _.merge({},
    BlogResolver,
    UserResolver,
);

export default resolvers;

