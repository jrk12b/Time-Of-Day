// const PORT = process.env.PORT || 8000;
const PORT = 8000;
const HOST =
	process.env.NODE_ENV === 'production'
		? 'https://time-of-day-db-cdee05bd35c4.herokuapp.com'
		: `http://localhost:${PORT}`;
const MONGODB_URI =
	process.env.MONGODB_URI ||
	'mongodb+srv://justinkurdila:YMpla2q9VsVA49T5@cluster1.fdjjmus.mongodb.net/activities';

module.exports = {
	HOST,
	PORT,
	MONGODB_URI,
};
