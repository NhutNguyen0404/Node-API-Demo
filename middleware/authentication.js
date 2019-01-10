import jwt from 'jsonwebtoken';
import configToken from '../config/index';
import User from '../models/user';

const key = configToken.secretKey;

export default async (req, res, next) => {
    try {
		const token = req.body.token || req.params.token || req.query.token || req.headers.token;
		if (token) {
			let data = jwt.verify(token, key);
			let user = await User.findOne({_id: data._id});
			if (!user) {
				return next(new Error('User not exist'));
			}

			if (user.isLogin === undefined || !user.isLogin) {
				return next(new Error('User loguted'));
			}

			req.body.userLogin = user;
			return next();
		}
		return next(new Error("No token provided"));
	} catch(err) {
		return next(err);
	}
};