import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let groupSchema = new Schema({
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
		type: [{
			memberId: {
				type: mongoose.Schema.Types.ObjectId,
    			ref: 'User'
			},
			deleteAt: Date
		}]
	}
});

let Group = mongoose.model('Group', groupSchema);

export default Group;