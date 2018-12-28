import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let groupSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: 255
	},

});

let Group = mongoose.model('User', groupSchema);

export default Group;