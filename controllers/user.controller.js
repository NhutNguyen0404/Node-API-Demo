import User from '../models/user';
import MD5 from 'md5';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const key = "922B9ED12B96D7C43F89B15F96154";
const UserController = {};

UserController.getAll = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.json({
            items: users
        });
    } catch (err) {
        next(err);
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

UserController.create = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        const user = new User({
            fullName,
            email,
            password: await bcrypt.hashSync(password, salt),
        });
        await user.save();
        return res.status(200).json({
            isSuccess: true,
            items: user
        });

    } catch (err) {
        next(err);
    }
};

UserController.updateUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const newData = req.body;
        if (newData.password) {
            newData.password =  await bcrypt.hashSync(newData.password, salt);
        }
        const user = await User.findOneAndUpdate({_id:_id}, newData);
        return res.status(200).json({
            isSuccess: true,
            message: 'Update susscess'
        });
    } catch (err) {
        next(err);
    }
};


UserController.login = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return next(new Error('User is not found'));
        }

        const isCorrectPassword = bcrypt.compareSync(password, user.password);

        if (!isCorrectPassword) {
            return next(new Error('password is not correct'));
        }
        
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

UserController.changePassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { currentPasswrod, newPassword } = req.body;
        let user = await User.findById(id);
        if (user === null) {
            return res.status(400).json({
                isSuccess: false,
                message: 'User not found!'
            });
        }

        if (!bcrypt.compareSync(currentPasswrod, user.password)) {
            return res.status(400).json({
                isSuccess: false,
                message: 'The password is not correct!'
            });  
        }

        user.password =  await bcrypt.hashSync(newPassword, salt);
        await user.save();
        return res.status(200).json({
            isSuccess: true,
            message: 'Update susscess!'
        });  

    } catch (err) {
        return next(err);
    }
}

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
        
        user.deletedAt = Date.now();
        await user.save();
        return res.status(200).json({
            isSuccess: true,
            message: 'Delete susscess'
        });
    } catch (err) {
        next(err);
    }
};

export default UserController;