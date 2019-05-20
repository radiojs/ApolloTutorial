import DateSchema from './date';
import BlogSchema from './blog';
import UserSchema from './user';

const Query = `
  type Query {
    _empty: String
  }
`;

const RootMutation = `
  type Mutation
`;

const RootSubscription = `
  type Subscription
`;

const schema = [
    Query,
    RootMutation,
//    RootSubscription,
    DateSchema,
    BlogSchema,
    UserSchema,
];

export default schema;
