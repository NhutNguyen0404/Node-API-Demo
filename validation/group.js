import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
const group = {};
group.create = {
    body: {
		name: Joi.string().required().max(255),
		lastMessage: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
		author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
		members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required())
  	}
};
group.update = {
    body: {
		name: Joi.string().required().max(255),
		lastMessage: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
		author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
		members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required())
  	}
};
export default group;