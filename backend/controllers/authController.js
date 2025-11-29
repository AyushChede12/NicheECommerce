const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Provide name, email, password and role before submitting" })
        }
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcryptjs.hash(password, 10);

        user = new User({ name, email, password: hashed, role })
        await user.save();

        const payload = { id: user._id, email: user.email, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })

    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Provide name, email and password before submitting" })
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' })

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' })

        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })


    }
}

const me = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('password');
        res.json(user);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" })
    }
}

module.exports = {register, login, me};