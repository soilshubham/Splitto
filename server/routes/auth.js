const router = require('express').Router();
const User = require('../models/User');
const Group = require('../models/Group');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
    try {
        // Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });


        // Save user to database
        await newUser.save();
        res.json({
            msg: 'User created successfully',
            msgError: false,
        });
    }
    catch (err) {
        res.json({
            msg: err.message,
            msgError: true,
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.json({
                msg: 'User not found',
                msgError: true,
            });
        }
        else {
            const userData = {
                name: user.name,
                email: user.email,
                groups: user.groups,
                _id: user._id,
            };
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                res.status(200).json({
                    msgError: false,
                    msg: "User logged in successfully",
                    user: userData
                });
            }
            else {
                res.json({
                    msgError: true,
                    msg: "Invalid password"
                })
            }
        }
    }
    catch (err) {
        res.status(400).json({
            msgError: true,
            msg: err.message
        });
    }
});

// Create Group
router.post('/create-group', async (req, res) => {
    try {
        const newGroup = await new Group({
            name: req.body.name,
            users: [],
        });
        const user = await User.findById(req.body.userID);
        user.groups.push(newGroup._id);
        newGroup.users.push(user._id);
        await user.save();
        await newGroup.save();
        res.json({
            msg: 'Group created successfully',
            msgError: false,
        });
    }
    catch (err) {
        res.json({
            msg: err.message,
            msgError: true,
        });
    }
})

module.exports = router;