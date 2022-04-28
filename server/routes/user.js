const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// update user
router.put('/:id', async (req, res) => {
    if (req.body.userID === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                const newPassword = await bcrypt.hash(req.body.password, salt);
                req.body.password = newPassword;
            }
            catch (err) {
                res.status(500).json("error: " + err);
            }

        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("User updated");
        }
        catch (err) {
            res.status(500).json("error: " + err);
        }
    } else {
        return res.status(403).json("You are not authorized to update this user");
    }
})

// delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userID === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User deleted");
        }
        catch (err) {
            res.status(500).json("error: " + err);
        }
    } else {
        return res.status(403).json("You are not authorized to delete this user");
    }
})

// get user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, updatedAt, ...userData } = user._doc;
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json("error: " + err);
    }
})

// Friend user
router.put('/:id/friend', async (req, res) => {
    if (req.body.userID != req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userID)
            if (!user.friends.includes(currentUser._id)) {
                user.friends.push(currentUser._id);
                currentUser.friends.push(user._id);
                await user.save();
                await currentUser.save();
                res.status(200).json("Added friend");
            } else {
                res.status(200).json("User already your friend");
            }
        }
        catch (err) {
            res.status(500).json("error: " + err);
        }
    } else {
        return res.status(403).json("You are not authorized to add this user");
    }
})

// unfriend user
router.put('/:id/unfriend', async (req, res) => {
    if (req.body.userID != req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userID)
            if (user.friends.includes(currentUser._id)) {
                user.friends.pull(currentUser._id);
                currentUser.friends.pull(user._id);
                await user.save();
                await currentUser.save();
                res.status(200).json("Removed friend");
            } else {
                res.status(200).json("You not friends with the user");
            }
        }
        catch (err) {
            res.status(500).json("error: " + err);
        }
    } else {
        return res.status(403).json("You are not authorized to unfriend this user");
    }
})


module.exports = router;