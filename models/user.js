import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
	gender: Boolean,
    firstName: {
	    type: String,
	    required: true
	},
    lastName: {
	    type: String,
	    required: true
	},
    email: {
	    type: String,
	    validate: {
			validator: function(v) {
				return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
			},
			message: props => `${props.value} is not a valid email!`
		},
		required: true,
		unique: true
	},
    password: {
	    type: String,
	    required: true,
	    minlength: 6
	},
    refNames: [String],
    birthday: {
	    type: Date,
	    validate: {
	    	validator: function(v) {
	    		return (new Date()).getFullYear() -  (new Date(v)).getFullYear() >= 18;
	    	},
	    	message: props => `${props.value} you must 18 age!`
	    },
	    required: true
	}
});

let User = mongoose.model('User', userSchema);

export default User;