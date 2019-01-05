import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
const group = {};
group.create = {
    body: {
		name: Joi.string().required().max(255),
		lastMessage: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
		author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
		members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()),
		deletedAt: Joi.default(null),
  	}
};
group.update = {
    body: {
		name: Joi.string().max(255),
		lastMessage: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
		author: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
		members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()),
		deletedAt: Joi.empty(Joi.any()).default(null),
  	}
};
export default group;