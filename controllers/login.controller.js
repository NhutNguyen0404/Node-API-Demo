import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configToken from '../config/index.js';

const saltRounds = configToken.saltRounds;
const salt = bcrypt.genSaltSync(saltRounds);
const key = configToken.secretKey;
const Login = {};

Login.login = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return next(new Error('User is not found'));
        }

        if (user.isLogin === true) {
            return next(new Error('User is logined'));
        }

        const isCorrectPassword = bcrypt.compareSync(password, user.password);

        if (!isCorrectPassword) {
            return next(new Error('password is not correct'));
        }

        user.isLogin = true;
        await user.save();   
        const token = jwt.sign({
            "_id": user._id,
            "email": user.email
        }, key, {
            expiresIn: 86400,
            algorithm: 'HS256'
        });
        
        return res.json({
            isSuccess: true,
            items: token
        });
    } catch (err) {
        return next(err);
    }
};

export default Login;