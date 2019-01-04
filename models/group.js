import mongoose from 'mongoose';
import User from '../models/user';
const Schema = mongoose.Schema;
const cols = {
	name: {
		type: String,
		required: true,
		maxlength: 255
	},
	lastMessage: {
		type: mongoose.Schema.Types.ObjectId,
    	ref: 'User'
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
    	ref: 'User',
		required: true
	},
	members: {
		type: [
			{type: mongoose.Schema.Types.ObjectId,
    		ref: 'User'}
		]
	},
	deletedAt: {
		type: Date
	}
};

let groupSchema = new Schema(cols);
const checkMember = async (members, next) => {
	try {
		const users = await User.find({_id: members});
		if (users.length < members.length) {
			return false;
		}
		return true;
	} catch (err) {
		return next(err);
	}
};
groupSchema.pre('save', async function(next) {
	const userId = this.author;
	const members = this.members;

	let isMember = await checkMember([userId]);
	if (!isMember) {
		return next(new Error('User not found!'));
	}

	isMember = await checkMember(members); 
	if (!isMember) {
		return next(new Error('Members not found!'));
	}

	return next();
});

groupSchema.pre('find', function() {
	const query = this.getQuery();
    query['$and'] = [
        {
            deletedAt: null
        },
        {
            deleteAt: null
        }
    ]
});

groupSchema.pre('findOne', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            deletedAt: null
        },
        {
            deleteAt: null
        }
    ]
});

// create table recyGroup
let recyGroupSchema = new Schema(cols);
let recyGroup = mongoose.model('recyGroup', recyGroupSchema);
let Group = mongoose.model('Group', groupSchema);

export default {group: Group, recyGroup: recyGroup};