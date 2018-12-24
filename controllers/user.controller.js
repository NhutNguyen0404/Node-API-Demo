import User from '../models/user';

const UserController = {};

UserController.getAll = async (req, res) => {
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
        return res.status(400).json({
            isSuccess: false,
            message: err.message,
            error: err
        });
    }
};

UserController.getOneUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        return res.status(200).json({
            isSuccess: true,
            user
        });
    } catch(e) {
        return res.status(400).json({
            isSuccess: false,
            message: e.message,
            error: e
        });
    }
};

UserController.addUser = async (req, res) => {
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
        return res.status(400).json({
            isSuccess: false,
            error: err
        });
    }
};

UserController.updateUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const newData = req.body;
        const userUpdae = await User.findOneAndUpdate({_id:_id}, newData)
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
        return res.status(400).json({
            isSuccess: false,
            error: err
        });
    }
};

UserController.deleteUser = async (req, res) => {

};

export default UserController;
