import Groups from '../models/group';
const Group = Groups.group;
const RecyGroup = Groups.recyGroup;
const GroupController = {};

GroupController.getAll = async (req, res, next) => {
	try {
		const groups = await Group.find().populate('user').populate({path: 'author', select: 'firstName'}).populate({path: 'members', select: 'firstName'});
        return res.status(200).json({
        	isSuccess: true,
            items: groups,
        });
	} catch (err) {
		next(err);
	}
};

GroupController.getById = async (req, res, next) => {
	try {
        const _id = req.params.id;
        let group = await Group.findById(_id);
        if (group === null) {
			return res.status(400).json({
	            isSuccess: false,
	            message: "Group not found!"
        	});
		}

        return res.status(200).json({
            isSuccess: true,
            items: group
        });
    } catch(err) {
        next(err);
    }
};

GroupController.create = async (req, res, next) => {
	try {
		const {name, lastMessage, author, members} = req.body;
		let group = new Group({
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
		return next(err);
	}
};

GroupController.update = async (req, res, next) => {
	try {
		let _id = req.params.id;
		let dataUpdate = req.body;
		let group = await Group.findById(_id);
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
		return next(err);
	}
};

GroupController.addMembers = async (req, res, next) => {
	try {
		const _id = req.params.id;
		const newMembers = req.body.members;
		let group = await Group.findById(_id);
		if (group === null) {
			return res.status(400).json({
	            isSuccess: false,
	            message: "Group not found!"
        	});
		}

		let members = group.members;
		members.push.apply(members, newMembers);
		group.members = removeDuplicate(members);
		await group.save(group);
        return res.status(200).json({
            isSuccess: true,
            message: 'Update susscess'
        });

	} catch (err) {
		return next(err);
	}
};

GroupController.deleteMembers = async (req, res, next) => {
	try {
		const _id = req.params.id;
		const members = req.body.members;
		let group = await Group.findById(_id);
		if (group === null) {
			return res.status(400).json({
	            isSuccess: false,
	            message: "Group not found!"
        	});
		}

		let oldMembers = group.members.join() + ',';
		for (let i = 0; i < members.length; i++) {
			let regex = new RegExp(members[i]+',');
			oldMembers = oldMembers.replace(regex, '');
		}

		oldMembers = oldMembers.slice(0, -1);
		group.members = oldMembers.split(',');
		await group.save(group);
        return res.status(200).json({
            isSuccess: true,
            message: 'Update susscess'
        });

	} catch (err) {
		return next(err);
	}
};

GroupController.delete = async (req, res, next) => {
	try {
		const _id = req.params.id;
		let group = await Group.findById(_id);
		if (group === null) {
			return res.status(400).json({
	            isSuccess: false,
	            message: "Group not found!"
        	});
		}

		const isCopy = await copy(group, RecyGroup);
		group.deletedAt = Date.now();
		// await group.update({deletedAt: deletedAt.now()});
		await group.save();
        return res.status(200).json({
            isSuccess: true,
            message: 'Delete susscess'
        });

	} catch (err) {
		return next(err);
	}
};

const copy = async (data, tableContent) => {
	try {
		const {_id ,name, lastMessage, author, members, __v} = data;
		let groupDelete = new tableContent({_id ,name, lastMessage, author, members, __v});
		await groupDelete.save();
        return {
            isSuccess: true,
            message: 'Copy susscess'
        };
	} catch (err) {
		return {
            isSuccess: false,
            message: err
        };
	}
};

const removeDuplicate = (arr) => {
    let uniqueArray = arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return uniqueArray;
}

export default GroupController;