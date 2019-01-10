import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
	gender: Boolean,
    fullName: {
	    first: {
            type: String,
            maxlength: [ 30, 'firstName is too long!' ]
        },
        last: {
            type: String,
            maxlength: [ 30, 'lastName is too long!' ],
        }
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
		maxlength: [30, 'email is too long!'],
		index: { unique: true }
	},
	password: {
		type: String,
		required: true,
		maxlength: [255, 'password is too long!']
	},
	deletedAt: Date,
	isLogin: {
		type: Boolean,
		default: false
	}
});

userSchema.pre('find', function() {
	const query = this.getQuery();
    query['$and'] = [
        {
            deletedAt: null
        }
    ]
});

userSchema.pre('findOne', function() {
	const query = this.getQuery();
    query['$and'] = [
        {
            deletedAt: null
        }
    ]
});

let User = mongoose.model('User', userSchema);

export default User;