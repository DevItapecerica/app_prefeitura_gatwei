import loginApi from '../api/login_api.js';

export const authJWT = async (request, reply) => {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw { status: 403, message: 'Token não informado' };
    }

    const decodedUserResponse = await loginApi.post('/authUser', { token });

    request.user = decodedUserResponse.data.user;
  } catch (error) {
    // Lança o erro para o error handler do Fastify
    throw error;
  }
};
