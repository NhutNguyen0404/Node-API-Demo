import mongoose from 'mongoose';
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
		type: [{
			memberId: {
				type: mongoose.Schema.Types.ObjectId,
    			ref: 'User'
			},
			deleteAt: Date
		}]
	}
};

let groupSchema = new Schema(cols);
// create table recyGroup
let recyGroupSchema = new Schema(cols);
let recyGroup = mongoose.model('recyGroup', recyGroupSchema);
let Group = mongoose.model('Group', groupSchema);

export default {group: Group, recyGroup: recyGroup};