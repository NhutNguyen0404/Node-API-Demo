import Group from '../models/group';

const GroupController = {};

GroupController.getAll = async (req, res, next) => {
	try {
		await Group.find().populate('user').populate({path: 'author', select: 'firstName'}).populate({path: 'members.memberId', select: 'firstName'}).exec((err, groups) => {
            if (err) {
                next(err);
            }
            return res.status(200).json({
            	isSuccess: true,
                items: groups,
            });
        });
	} catch (err) {
		next(err);
	}
};

GroupController.create = async (req, res, next) => {
	try {
		const {name, lastMessage, author, members} = req.body;
		const group = new Group({
			name,
			lastMessage,
			author,
			members
		});
		await group.save();
        return res.status(200).json({
            isSuccess: true,
            items: group
        });

	} catch (err) {
		next(err);
	}
}

GroupController.update = async (req, res, next) => {
	try {
		const _id = req.params.id;
		const dataUpdate = req.body;
		const group = Group.findById(_id);
		if (group === null) {
			return res.status(400).json({
	            isSuccess: false,
	            message: "Group not found!"
        	});
		}

		await group.update(dataUpdate);
        return res.status(200).json({
            isSuccess: true,
            message: 'Update susscess'
        });

	} catch (err) {
		next(err);
	}
}

GroupController.delete = async (req, res, next) => {
	try {
		const _id = req.params.id;
		const dataUpdate = req.body;
		const group = Group.findById(_id);
		if (group === null) {
			return res.status(400).json({
	            isSuccess: false,
	            message: "Group not found!"
        	});
		}

		await group.remove();
        return res.status(200).json({
            isSuccess: true,
            message: 'Delete susscess'
        });

	} catch (err) {
		next(err);
	}
}

export default GroupController;