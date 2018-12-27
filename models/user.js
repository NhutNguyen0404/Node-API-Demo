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
		index: { unique: true }
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
	},
	isDelete: {
	    type: Boolean,
	    default: false
	},
});

userSchema.pre('find', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        },
        {
            isDelete: null
        }
    ]
});

userSchema.pre('findOne', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        },
        {
            isDelete: null
        }
    ]
});

let User = mongoose.model('User', userSchema);

export default User;