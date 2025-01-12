const PORT = process.env.PORT || 8000;
const MONGO_URI =
	process.env.MONGODB_URI ||
	'mongodb+srv://justinkurdila:YMpla2q9VsVA49T5@cluster1.fdjjmus.mongodb.net/activities';

module.exports = {
	PORT,
	MONGO_URI,
};
