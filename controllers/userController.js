const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if(userExists) {
		res.status(400).json({error: "Email already exists"});
		return;
	}
	const user = await User.create({ name, email, password });
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
