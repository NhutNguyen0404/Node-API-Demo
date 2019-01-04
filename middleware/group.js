import User from '../models/user';
const GroupMiddleware = {};

GroupMiddleware.checkId = async (req, res, next) => {
	try {
        const userId = req.body.author;
        let user = await User.findById(userId);
        if (user === null) {
			return res.status(400).json({
	            isSuccess: false,
	            message: "User not found!"
        	});
		}
       	return next();
    } catch(err) {
        return next(err);
    }
};

export default GroupMiddleware;