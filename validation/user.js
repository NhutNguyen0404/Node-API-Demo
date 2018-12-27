import Joi from 'joi';
export default {
  // POST /api/tasks
  createUser: {
    body: {
      email: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  }
};