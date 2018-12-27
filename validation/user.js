import Joi from 'joi';
const user = {};
user.createUser = {
    body: {
		email: Joi.string().email().max(255),
		gender: Joi.boolean().default(true),
		firstName: Joi.string().max(20).required(),
		lastName: Joi.string().max(20).required(),
		password: Joi.string().min(6).required(),
		refNames: Joi.array(),
		birthday: Joi.date()
  	}
};
user.updateUser = {
    body: {
		email: Joi.string().email().max(255),
		gender: Joi.boolean().default(true),
		firstName: Joi.string().max(20).required(),
		lastName: Joi.string().max(20).required(),
		password: Joi.string().min(6).required(),
		refNames: Joi.array(),
		birthday: Joi.date()
  	}
};
export default user;