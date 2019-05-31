import { PubSub } from 'graphql-subscriptions';

import { encodeJwtToken } from '../lib/auth';
import User from '../datasource/user';

const pubSub = new PubSub();
const ON_SIGNED_IN = 'ON_SINED_IN';

const resolvers = {
    Subscription: {
        onSignedIn: {
            subscribe: () => (pubSub.asyncIterator([ON_SIGNED_IN]))
        }
    },

    Query: {
        async meView(root, args, context) {
            const { user } = context || {};
            const object = user && user._id ? await User.findById(user._id) : null;
            if (!object) return null;

            return {
                _id: object._id,
                email: object.email,
                createdAt: object.createdAt,
            };
        }
    },

    Mutation: {
        signUp: async (root, { email, password }) => {
            const object = {
                email,
                password,
                createdAt: new Date(),
            };
            const user = new User(object);
            const result = await user.save();

            object._id = result._id;
            const token = encodeJwtToken({
                _id: result._id,
            });

            return {
                user: object,
                token,
            };
        },
        signIn: async (root, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                return null;
            }
            
            if (password !== user.password) {
                return false;
            }

            const token = encodeJwtToken({
                _id: user._id,
            });

            pubSub.publish(ON_SIGNED_IN, { onSignedIn: user });
            
            return {
                user: {
                    _id: user._id,
                    email: user.email,
                    createdAt: user.createdAt,
                },
                token,
            };
        }
    }
};

export default resolvers;
