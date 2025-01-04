const HOST = process.env.HOST || 'http://localhost:8000';
const PORT = process.env.PORT || 8000;
const MONGO_URI =
	process.env.MONGODB_URI ||
	'mongodb+srv://justinkurdila:YMpla2q9VsVA49T5@cluster1.fdjjmus.mongodb.net/activities';

module.exports = {
	HOST,
	PORT,
	MONGO_URI,
};
