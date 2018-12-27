import express from 'express';
import bodyParser from 'body-parser';
import connectToDb from './db/connect';
import user from './routes/user.routes';
import classes from './routes/class.routes';
const server = express();

connectToDb();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(user);
server.use(classes);

server.use((err, req, res, next) => {
	if (err) {
		let status = 503;
		if (err.status) {
			status = err.status
		}
		return res.status(status).json({
			isSuccess: false,
			error: err
		});
	}
});

server.listen(3001, () => {
    console.log('Server started at: 3001');
});