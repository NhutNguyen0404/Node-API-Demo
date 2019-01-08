import Joi from 'joi';
const user = {};
user.createUser = {
    body: {
		fullName: Joi.object().keys({
			first: Joi.string().min(3).max(30),
			last: Joi.string().min(3).max(30),
		}),
		email: Joi.string().email().max(30),
		password: Joi.string().min(6).max(255),
		deletedAt: Joi.empty(Joi.any()).default(null),
  	}
};
user.updateUser = {
    body: {
		fullName: Joi.object().keys({
			first: Joi.string().min(3).max(30),
			last: Joi.string().min(3).max(30),
		}),
		email: Joi.string().email().max(30),
		password: Joi.string().min(6).max(255),
		deletedAt: Joi.empty(Joi.any()).default(null),
  	}
};
export default user;