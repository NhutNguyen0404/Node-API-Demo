import Joi from 'joi';
const login = {};
login.login = {
    body: {
		password: Joi.string().min(6).max(255).required(),
		email: Joi.string().email().max(30).required()
  	}
};

export default login;