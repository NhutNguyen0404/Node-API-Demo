import Joi from 'joi';
const group = {};
group.create = {
    body: {
		name: Joi.string().max(22),
		lastMessage: Joi.string().max(32),
		author: Joi.string().max(32),
		'members.memberId': Joi.string().max(32),
		'members.deleteAt': Joi.date()
		
  	}
};
group.update = {
    body: {
		name: Joi.string().max(255),
		lastMessage: Joi.string().max(32),
		author: Joi.string().max(32),
		'members.memberId': Joi.string().max(32),
		'members.deleteAt': Joi.date()
  	}
};
export default group;