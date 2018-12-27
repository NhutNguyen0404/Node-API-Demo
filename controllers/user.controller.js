import User from '../models/user';

const UserController = {};

UserController.getAll = async (req, res, next) => {
    try {
        await User.find().exec((err, users) => {
            if (err) {
                res.status(500).send(err);
            }
            return res.json({
                users,
            });
        });
    } catch (err) {
        next(next);
    }
};

UserController.getOneUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        return res.status(200).json({
            isSuccess: true,
            user
        });
    } catch(err) {
        next(err);
    }
};

UserController.addUser = async (req, res, next) => {
    try {
        const { password, refNames, firstName, lastName, gender, email, birthday } = req.body;
        const user = new User({
            password,
            refNames,
            firstName,
            lastName,
            gender,
            email,
            birthday
        });
        await user.save();
        return res.status(200).json({
            isSuccess: true,
            user
        });

    } catch (err) {
        next(err);
    }
};

UserController.updateUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const newData = req.body;
        const user = await User.findOneAndUpdate({_id:_id}, newData);
        return res.status(200).json({
            isSuccess: true,
            message: 'Update susscess'
        });
    } catch (err) {
        next(err);
    }
};

UserController.deleteUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const newData = req.body;
        const user = await User.findById(_id);
        if (user === null) {
            return res.status(422).json({
                isSuccess: false,
                message: 'User not found!'
            });  
        }

        await user.update({isDelete: true});
        return res.status(200).json({
            isSuccess: true,
            message: 'Delete susscess'
        });

    } catch (err) {
        next(err);
    }
};

export default UserController;