const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
	const { name, email, password } = req.body;

	const user = User.findOne({ email });

	if(user) {
		res.status(400).json({error: "Email already exists"});
		return;
	}
	User.create({ name, email, password }).then((data) => console.log(data));
	res.status(201).json({
		name: user.name,
		email: user.email,
	});
};

module.exports.login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			res.status(200).json(req.body);
		} else {
			res.status(403).json({ error: "Password doesn't match" });
		}
	} else {
		res.status(404).json({ error: "Email doesn't exist" });
	}
};

module.exports.logout = async (req, res) => {
	res.status(301);		
}
