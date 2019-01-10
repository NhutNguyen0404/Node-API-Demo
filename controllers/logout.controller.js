import User from '../models/user';

const Logout = {};

Logout.logout = async (req, res, next) => {
    try {
        const { _id, email } = req.body.userLogin;
        const user = await User.findOne({ email });

        if (!user) {
            return next(new Error('User is not found'));
        }

        if (user.isLogin === false) {
            return next(new Error('User is logoute'));
        }

        user.isLogin = false;
        await user.save();   
        
        return res.json({
            isSuccess: true
        });
    } catch (err) {
        return next(err);
    }
};

export default Logout;