import { AuthenticationError } from 'apollo-server-express';
import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SERVER_SECRET;

/**
 * check the user is authenticated
 *
 * @param user
 */
const checkAuthentication = (user) => {
  if (!user) {
    throw new AuthenticationError('error_user_not_authenticated');
  }
};

/**
 * create a TOKEN with the minimal user information
 *
 * @param user
 * @returns {*}
 */
const encodeJwtToken = (user) => (jsonwebtoken.sign(
  {
    _id: user._id,
    name: user.name,
    photo: user.photo,
  },
  JWT_SECRET,
  { expiresIn: '10d' },
));

/**
 * verify and return the user information from the token
 *
 * @param authorization
 * @returns {*}
 */
const decodeJwtToken = (authorization) => {
  const parts = authorization.trim().split(' ');
  const token = parts.pop();
  return token && jsonwebtoken.verify(token, JWT_SECRET);
};

export {
  checkAuthentication,
  encodeJwtToken,
  decodeJwtToken,
};
